const Node = require('./Node')
const constants = require('../../utils/constants')

class AssignmentExpression extends Node {
  constructor (parser, left) {
    super(parser)

    this.left = left || parser.nextNode(this)
    const token = parser.nextToken()

    if (token.type !== 'operator' && !constants.ASSIGNMENT_OPERATORS.includes(token.value)) {
      this.syntaxError('Token is not a assignment operator', token)
    }

    this.operator = token.value
    this.right = parser.nextNode(this)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'AssignmentExpression',
      operator: this.operator,
      left: this.left.resolve(ctx),
      right: this.right.resolve(ctx)
    })
  }
}

module.exports = AssignmentExpression
