const FireScriptNode = require('./FireScriptNode')

class BinaryExpression extends FireScriptNode {
  constructor (tokenStack, parent, left) {
    super(parent)

    this.left = left || this.createNodeItem(tokenStack)

    const token = tokenStack.next()
    if (token.type !== 'operator' && !this.binaryOperatorPattern.test(token.value)) {
      this.syntaxError('Token is not a binary operator', token)
    }

    this.operator = token.value
    this.right = this.createFullNode(tokenStack)
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
