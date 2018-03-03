const FireScriptNode = require('./FireScriptNode')
const constants = require('../utils/constants')

class BinaryExpression extends FireScriptNode {
  constructor (tokenStack, parent, left) {
    super(parent)

    this.left = left || this.createNodeItem(tokenStack)

    const token = tokenStack.next()
    if (token.type !== 'operator' && !constants.BINARY_OPERATORS.includes(token.value)) {
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
