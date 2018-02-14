const FireScriptNode = require('./FireScriptNode')

class ExpressionStatement extends FireScriptNode {
  constructor (tokenStack, parent, expression) {
    super(parent)

    this.expression = expression
  }

  toJSON () {
    return {
      type: 'ExpressionStatement',
      expression: this.expression.toJSON()
    }
  }
}

module.exports = ExpressionStatement
