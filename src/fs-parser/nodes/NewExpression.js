const Node = require('./Node')
const constants = require('../../utils/constants')

const ALLOWED_CALLEE_TYPES = constants.EXPRESSIONS

class NewExpression extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('keyword "new"')) {
      this.syntaxError('NewExpression expected!')
    }

    parser.skipNext()

    this.callee = parser.nextRealNode(this)
    this.isAllowedNode(this.callee, ALLOWED_CALLEE_TYPES)
    this.arguments = []

    if (!parser.match('punctuator "(""')) {
      parser.syntaxError('Unexpected token, call expression expected!')
    }

    for (const scope of parser.walkScope()) {
      this.arguments.push(scope.nextNode(this))
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'NewExpression',
      callee: this.callee.resolve(ctx),
      arguments: this.arguments.map((item) => item.resolve(ctx))
    })
  }
}

module.exports = NewExpression
