const FireScriptElement = require('./FireScriptElement')

class ExpressionStatement extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.expression = this.createElement(ast.expression)
  }

  toString () {
    return this.expression.toString()
  }
}

module.exports = ExpressionStatement
