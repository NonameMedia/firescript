const FireScriptNode = require('./FireScriptNode')

class AssignmentExpression extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.left = this.createIdentifierNode(tokenStack)
    const token = tokenStack.shift()

    if (token.type !== 'operator' && !this.assignmentOperatorPattern.test(token.value)) {
      this.syntaxError('Token is not a assignment operator', token)
    }

    this.operator = token.value
    this.right = this.createNode(tokenStack)
  }

  toJSON () {
    return {
      type: 'AssignmentExpression',
      operator: this.operator,
      left: this.left.toJSON(),
      right: this.right.toJSON()
    }
  }
}

module.exports = AssignmentExpression
