const FireScriptNode = require('./FireScriptNode')

class BinaryExpression extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    const token = tokenStack.shift()

    if (token.type !== 'operator' && !this.binaryOperatorPattern.test(token.value)) {
      this.syntaxError('Token is not a binary operator', token)
    }

    this.operator = token.value
    this.right = this.createNode(tokenStack)
  }

  toJSON () {
    return {
      type: 'BinaryExpression',
      operator: this.operator,
      left: this.left.toJSON(),
      right: this.right.toJSON()
    }
  }
}

module.exports = BinaryExpression
