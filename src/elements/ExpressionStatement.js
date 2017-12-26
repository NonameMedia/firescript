const FireScriptElement = require('./FireScriptElement')

class ExpressionStatement extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.expression = ast.expression
  }

  toString () {

  }
}

module.exports = ExpressionStatement
