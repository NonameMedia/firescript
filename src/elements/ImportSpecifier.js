const FireScriptElement = require('./FireScriptElement')

class ImportSpecifier extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.local = this.createElement(ast.local)
    this.imported = this.createElement(ast.imported)
  }

  toString () {
    const imported = this.imported.toString()
    const local = this.local.toString()
    return imported && imported !== local ? `${imported} as ${local}` : local
  }
}

module.exports = ImportSpecifier
