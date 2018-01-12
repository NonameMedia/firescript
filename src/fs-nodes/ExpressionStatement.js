const FireScriptNode = require('./FireScriptNode')

class ExpressionStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    if (this.lookForward(tokenStack, 'punctation', '=', 1)) {
      this.expression = this.createAssignmentNode(tokenStack)
    } else if (this.lookForward(tokenStack, 'punctation', '(', 1)) {
      this.expression = this.createCallExpressionNode(tokenStack)
    }
  }

  toJSON () {
    return {
      type: 'ExpressionStatement',
      expression: this.expression.toJSON()
    }
  }
}

module.exports = ExpressionStatement
