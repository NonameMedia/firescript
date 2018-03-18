const JSElement = require('./JSElement')

class ArrayExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.elements = this.createElementList(ast.elements)
  }

  toString () {
    return `[ ${this.elements.join(', ')} ]`
  }
}

module.exports = ArrayExpression
