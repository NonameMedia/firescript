const FirescriptNode = require('./FirescriptNode')

class ExpressionStatement extends FirescriptNode {
  constructor (tokenStack, parent, expression) {
    super(tokenStack, parent)

    this.expression = expression
  }

  toJSON () {
    return this.createJSON({
      type: 'ExpressionStatement',
      expression: this.expression.toJSON()
    })
  }
}

module.exports = ExpressionStatement
