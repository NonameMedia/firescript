const FirescriptNode = require('./FirescriptNode')

class ExpressionStatement extends FirescriptNode {
  constructor (tokenStack, parent, expression) {
    super(tokenStack, parent)

    this.expression = expression

    this.tearDown()
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'ExpressionStatement',
      expression: this.expression.toJSON(ctx)
    })
  }
}

module.exports = ExpressionStatement
