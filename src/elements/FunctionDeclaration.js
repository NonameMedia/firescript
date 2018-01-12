const FireScriptElement = require('./FireScriptElement')

class FunctionDeclaration extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.id = this.createElement(ast.id)
    this.params = ast.params.map((item) => this.createElement(item))
    this.body = this.createElement(ast.body)
  }

  toString () {
    const indention = this.indentionStr()
    return `${indention}func ${this.id} (${this.params.join(', ')})\n${this.body}\n`
  }
}

module.exports = FunctionDeclaration
