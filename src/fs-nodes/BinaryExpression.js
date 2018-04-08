const FireScriptNode = require('./FireScriptNode')
const constants = require('../utils/constants')

class BinaryExpression extends FireScriptNode {
  constructor (tokenStack, parent, left) {
    super(parent)

    if (left) {
      this.left = left
    } else {
      if (tokenStack.expect('operator')) {
        this.syntaxError('Unexpected token!', tokenStack.current())
      }
      this.left = this.createNodeItem(tokenStack)
    }

    const token = tokenStack.next()
    if (token.type !== 'operator' && !constants.BINARY_OPERATORS.includes(token.value)) {
      this.syntaxError('Token is not a binary operator', token)
    }

    this.operator = token.value
    if (tokenStack.expect('operator')) {
      this.syntaxError('Unexpected token!', tokenStack.current())
    }

    this.right = this.createFullNode(tokenStack)
  }

  toJSON () {
    return this.createJSON({
      type: 'BinaryExpression',
      operator: this.operator,
      left: this.left.toJSON(),
      right: this.right.toJSON()
    })
  }
}

module.exports = BinaryExpression
