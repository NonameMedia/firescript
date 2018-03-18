const JSElement = require('./JSElement')

class ExpressionStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.expression = this.createElement(ast.expression)
  }

  toString () {
    return this.expression.toString()
  }
}

module.exports = ExpressionStatement
