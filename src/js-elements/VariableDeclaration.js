const JSElement = require('./JSElement')

class VariableDeclaration extends JSElement {
  constructor (ast) {
    super(ast)

    this.kind = ast.kind
    this.declarations = this.createElementList(ast.declarations)
  }

  toString () {
    return `${this.kind} ${this.declarations.join(', ')};`
  }
}

module.exports = VariableDeclaration
