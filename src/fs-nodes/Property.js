const FirescriptNode = require('./FirescriptNode')

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
 * @extends FirescriptNode
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
class Property extends FirescriptNode {
  constructor (tokenStack, parent, key) {
    super(tokenStack, parent)
    this.isBlockScope = true

    this.key = key || this.createNodeItem(tokenStack)
    this.isAllowedNode(this.key, ALLOWED_KEYS)
    this.method = false

    if (tokenStack.expect('punctuator', ':')) {
      tokenStack.goForward()
    } else if (tokenStack.expect('punctuator', '(')) {
      this.method = true
    } else {
      this.syntaxError('Unexpected token', tokenStack.current())
    }

    if (this.method) {
      this.value = this.createFunctionExpressionNode(tokenStack)
    } else if (tokenStack.isIndention('gt', this.indention)) {
      if (this.isObjectExpression(tokenStack)) {
        this.value = this.createObjectExpressionNode(tokenStack)
      // }
      //
      // const objectExpression = this.tryObjectExpression(tokenStack)
      // if (objectExpression) {
      //   this.value = objectExpression
      } else {
        const arrayExpression = this.tryArrayExpression(tokenStack)

        if (arrayExpression) {
          this.value = arrayExpression
        } else {
          this.syntaxError('Indention error', tokenStack.current())
        }
      }
    } else {
      const property = this.createFullNode(tokenStack)
      this.value = property
    }

    this.isAllowedNode(this.value, ALLOWED_VALUES)
  }

  toJSON () {
    return this.createJSON({
      type: 'Property',
      key: this.key.toJSON(),
      value: this.value.toJSON(),
      shorthand: false,
      computed: false,
      kind: 'init',
      method: this.method
    })
  }
}

module.exports = Property
