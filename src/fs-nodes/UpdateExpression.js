const FireScriptNode = require('./FireScriptNode')
const constants = require('../utils/constants')

class UpdateExpression extends FireScriptNode {
  constructor (tokenStack, parent, argument) {
    super(tokenStack, parent)

    if (!argument && tokenStack.expect('operator', ['++', '--'])) {
      this.prefix = true
      const token = tokenStack.next()
      this.operator = token.value
      this.argument = this.createNodeItem(tokenStack)
    } else {
      this.prefix = false
      this.argument = argument || this.createNodeItem(tokenStack)

      const token = tokenStack.next()
      if (token.type !== 'operator' && !constants.UPDATE_OPERATORS.includes(token.value)) {
        this.syntaxError('Token is not an update operator', token)
      }

      this.operator = token.value
    }
  }

  toJSON () {
    return this.createJSON({
      type: 'UpdateExpression',
      operator: this.operator,
      argument: this.argument.toJSON(),
      prefix: this.prefix
    })
  }
}

module.exports = UpdateExpression
