const JSElement = require('./JSElement')

class VariableDeclarator extends JSElement {
  constructor (ast) {
    super(ast)

    this.id = this.createElement(ast.id)
    this.init = this.createElement(ast.init)
  }

  toString () {
    if (!this.init) {
      return this.id
    }

    return `${this.id.toString()} = ${this.init.toString()}`
  }
}

module.exports = VariableDeclarator
