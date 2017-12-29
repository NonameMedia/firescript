const FireScriptElement = require('./FireScriptElement')

class VariableDeclarator extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.id = this.createElement(ast.id)
    this.init = ast.init === null ? null : this.createElement(ast.init)
  }

  toString () {
    return this.init === null ? this.id : `${this.id} = ${this.init}`
  }
}

module.exports = VariableDeclarator
