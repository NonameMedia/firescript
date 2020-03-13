const Node = require('./Node')

const ALLOWED_CHILDS = [
  'Identifier',
  'ArrayPattern',
  'ObjectPattern',
  'MemberExpression'
]

class RestElement extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('punctuator "..."')) {
      this.syntaxError('Unexpected token, ... punctuator expected')
    }

    parser.skipNext()

    this.argument = parser.nextNode(this)
    this.isAllowedNode(this.argument, ALLOWED_CHILDS)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'RestElement',
      argument: this.argument.resolve(ctx)
    })
  }
}

module.exports = RestElement
