const Node = require('./Node')

const ALLOWED_KEYS = [
  'Identifier',
  'Literal'
]

const ALLOWED_VALUES = [
  'Literal',
  'TemplateLiteral',
  'AssignmentPattern',
  'Identifier',
  'ObjectExpression',
  'ArrayExpression',
  'FunctionExpression',
  'ArrowFunctionExpression',
  'CallExpression',
  'MemberExpression',
  'LogicalExpression',
  'ConditionalExpression',
  'BinaryExpression',
  'null'
]

/**
 * Property node
 *
 * @class Property
 * @extends Node
 *
 * interface Property {
 *   type: 'Property';
 *   key: Identifier | Literal;
 *   computed: boolean;
 *   value: AssignmentPattern | Identifier | BindingPattern | FunctionExpression | null;
 *   kind: 'get' | 'set' | 'init';
 *   method: false;
 *   shorthand: boolean;
 * }
 */
class Property extends Node {
  constructor (parser, key) {
    super(parser)
    this.isBlockScope = true

    this.key = key || parser.nextRealNode(this)
    this.isAllowedNode(this.key, ALLOWED_KEYS)
    this.method = false

    if (parser.match('punctuator ":"')) {
      parser.skipNext()
    } else if (parser.match('punctuator "("')) {
      this.method = true
    } else {
      // this.syntaxError('Unexpected token')
    }

    if (this.method) {
      this.value = parser.createNode('FunctionExpression')
    } else if (parser.isInnerScope(this.indention)) {
      if (this.isObjectExpression()) {
        this.value = this.createObjectExpressionNode()
      // }
      //
      // const objectExpression = this.tryObjectExpression(tokenStack)
      // if (objectExpression) {
      //   this.value = objectExpression
      } else {
        const arrayExpression = this.tryArrayExpression()

        if (arrayExpression) {
          this.value = arrayExpression
        } else {
          this.syntaxError('Indention error')
        }
      }
    } else if (parser.match('punctuator ","') || parser.match('punctuator "}"')) {
      this.value = null
    } else {
      const property = parser.nextNode(this)
      this.value = property
    }

    this.isAllowedNode(this.value, ALLOWED_VALUES)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'Property',
      key: this.key.resolve(ctx),
      value: this.value ? this.value.resolve(ctx) : null,
      shorthand: false,
      computed: false,
      kind: 'init',
      method: this.method
    })
  }
}

module.exports = Property
