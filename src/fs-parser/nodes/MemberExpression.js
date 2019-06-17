const Node = require('./Node')

const ALLOWED_CHILDS = [
  'ThisExpression',
  'Identifier',
  'Literal',
  'ArrayExpression',
  'ObjectExpression',
  'FunctionExpression',
  'ArrowFunctionExpression',
  'ClassExpression',
  'TaggedTemplateExpression',
  'MemberExpression',
  'Super',
  'MetaProperty',
  'NewExpression',
  'CallExpression',
  'UpdateExpression',
  'AwaitExpression',
  'UnaryExpression',
  'BinaryExpression',
  'LogicalExpression',
  'ConditionalExpression',
  'YieldExpression',
  'AssignmentExpression',
  'SequenceExpression'
]

class MemberExpression extends Node {
  constructor (parser, object) {
    super(parser)

    this.object = object || parser.nextNode()
    this.computed = false
    // this.isAllowedNode(this.object, ALLOWED_CHILDS, tokenStack.current())
    //
    if (parser.match('indention')) {
      parser.nextToken()
    }

    if (parser.match('punctuator "["')) {
      this.computed = true
      parser.nextToken()
      this.property = parser.nextNode()

      if (parser.match('punctuator', ']')) {
        parser.nextToken()
      } else {
        parser.syntaxError('Unexpected token')
      }
    } else if (parser.match('punctuator "."')) {
      parser.nextToken()
      this.property = parser.nextNode()
    } else {
      parser.syntaxError('Unexpected token')
    }
    //
    // this.isAllowedNode(this.object, ALLOWED_CHILDS, tokenStack.current())
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'MemberExpression',
      computed: this.computed,
      object: this.object.resolve(ctx),
      property: this.property.resolve(ctx)
    })
  }
}

module.exports = MemberExpression
