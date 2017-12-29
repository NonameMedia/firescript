const FireScriptElement = require('./FireScriptElement')

class VariableDeclaration extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.kind = ast.kind
    this.declarations = ast.declarations.map((item) => this.createElement(item))
  }

  toString () {
    const indention = this.indentionStr()
    const declarations = this.declarations.map((item) => item.toString()).join(', ')
    return `${indention}${this.kind} ${declarations}`
  }
}

module.exports = VariableDeclaration
