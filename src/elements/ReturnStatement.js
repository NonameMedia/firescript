const FireScriptElement = require('./FireScriptElement')

class VariableDeclaration extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.argument = this.createElement(ast.argument)
  }

  toString () {
    const indention = this.indentionStr()
    return `${indention}return ${this.argument}`
  }
}

module.exports = VariableDeclaration
