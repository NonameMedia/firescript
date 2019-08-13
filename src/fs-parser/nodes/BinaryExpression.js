const Node = require('./Node')
const constants = require('../../utils/constants')

class BinaryExpression extends Node {
  constructor (parser, left) {
    super(parser)

    if (left) {
      this.left = left
    } else {
      if (parser.match('operator')) {
        this.syntaxError('Unexpected token!')
      }
      this.left = parser.nextNode(this)
    }

    const token = parser.nextToken()
    if (token.type !== 'operator' && !constants.BINARY_OPERATORS.includes(token.value)) {
      this.syntaxError('Token is not a binary operator')
    }

    this.operator = token.value
    this.right = parser.nextNode(this)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'BinaryExpression',
      operator: this.operator,
      left: this.left.resolve(ctx),
      right: this.right.resolve(ctx)
    })
  }
}

module.exports = BinaryExpression
