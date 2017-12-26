const FireScriptElement = require('./FireScriptElement')

class ImportDeclaration extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.source = this.createElement(ast.source)
    this.specifiers = ast.specifiers.map((item) => this.createElement(item))
  }

  toString () {
    const eol = this.nextChild && this.nextChild.type !== 'ImportDeclaration' ? '\n\n' : '\n'
    const source = this.source
    const specifiers = this.specifiers.join(', ')

    return `import ${specifiers} from ${source}${eol}`
  }
}

module.exports = ImportDeclaration
