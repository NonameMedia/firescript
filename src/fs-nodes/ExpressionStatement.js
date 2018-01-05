const FireScriptNode = require('./FireScriptNode')

class ExpressionStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.expression = this.createAssignmentNode(tokenStack)
  }

  toJSON () {
    return {
      type: 'ExpressionStatement',
      expression: this.expression.toJSON()
    }
  }
}

module.exports = ExpressionStatement
