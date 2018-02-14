const FireScriptNode = require('./FireScriptNode')

class ExpressionStatement extends FireScriptNode {
  constructor (tokenStack, parent, left) {
    super(parent)

    this.expression = this.createAssignmentExpressionNode(tokenStack, left)
  }

  toJSON () {
    return {
      type: 'ExpressionStatement',
      expression: this.expression.toJSON()
    }
  }
}

module.exports = ExpressionStatement
