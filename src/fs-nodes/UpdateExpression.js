const FireScriptNode = require('./FireScriptNode')

class UpdateExpression extends FireScriptNode {
  constructor (tokenStack, parent, argument) {
    super(parent)

    if (!argument && tokenStack.expect('operator', ['++', '--'])) {
      this.prefix = true
      const token = tokenStack.next()
      this.operator = token.value
      this.argument = this.createNodeItem(tokenStack)
    } else {
      this.prefix = false
      this.argument = argument || this.createNodeItem(tokenStack)

      const token = tokenStack.next()
      if (token.type !== 'operator' && !this.updateOperatorPattern.test(token.value)) {
        this.syntaxError('Token is not an update operator', token)
      }

      this.operator = token.value
    }
  }

  toJSON () {
    return {
      type: 'UpdateExpression',
      operator: this.operator,
      argument: this.argument.toJSON(),
      prefix: this.prefix
    }
  }
}

module.exports = UpdateExpression
