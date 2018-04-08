const FireScriptNode = require('./FireScriptNode')
const constants = require('../utils/constants')

class AssignmentExpression extends FireScriptNode {
  constructor (tokenStack, parent, left) {
    super(parent)

    this.left = left || this.createNodeItem(tokenStack)
    const token = tokenStack.next()

    if (token.type !== 'operator' && !constants.ASSIGNMENT_OPERATORS.includes(token.value)) {
      this.syntaxError('Token is not a assignment operator', token)
    }

    this.operator = token.value
    this.right = this.createFullNode(tokenStack)
  }

  toJSON () {
    return this.createJSON({
      type: 'AssignmentExpression',
      operator: this.operator,
      left: this.left.toJSON(),
      right: this.right.toJSON()
    })
  }
}

module.exports = AssignmentExpression
