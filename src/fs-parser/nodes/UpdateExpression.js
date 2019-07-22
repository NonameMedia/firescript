const Node = require('./Node')
const constants = require('../../utils/constants')

class UpdateExpression extends Node {
  constructor (parser, argument) {
    super(parser)

    if (!argument && parser.match('operator [++,--]')) {
      this.prefix = true
      const token = parser.nextToken()
      this.operator = token.value
      this.argument = parser.nextNode(this)
    } else {
      this.prefix = false
      this.argument = argument || parser.nextNode(this)

      const token = parser.nextToken()
      if (token.type !== 'operator' && !constants.UPDATE_OPERATORS.includes(token.value)) {
        this.syntaxError('Token is not an update operator', token)
      }

      this.operator = token.value
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'UpdateExpression',
      operator: this.operator,
      argument: this.argument.resolve(ctx),
      prefix: this.prefix
    })
  }
}

module.exports = UpdateExpression
