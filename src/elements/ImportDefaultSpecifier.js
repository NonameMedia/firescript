const FireScriptElement = require('./FireScriptElement')

class ImportDefaultSpecifier extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.local = this.createElement(ast.local)
  }

  toString () {
    return `** as ${this.local.toString()}`
  }
}

module.exports = ImportDefaultSpecifier
