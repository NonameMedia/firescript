const JSElement = require('./JSElement')

class CallExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = CallExpression
