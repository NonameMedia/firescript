const FirescriptNode = require('./FirescriptNode')
const constants = require('../utils/constants')

class BinaryExpression extends FirescriptNode {
  constructor (tokenStack, parent, left) {
    super(tokenStack, parent)

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

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'BinaryExpression',
      operator: this.operator,
      left: this.left.toJSON(ctx),
      right: this.right.toJSON(ctx)
    })
  }
}

module.exports = BinaryExpression
