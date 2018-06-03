const FireScriptNode = require('./FireScriptNode')

class ImportDeclaration extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    let token = tokenStack.next()
    if (!token.type === 'import') {
      this.syntaxError(`${token.value} is not a import declaration`)
    }

    this.specifiers = []

    while (true) {
      const nextToken = tokenStack.current()
      if (tokenStack.expect('identifier', 'from')) {
        tokenStack.goForward()
        break
      } else if (tokenStack.expect('literal') && this.specifiers.length === 0) {
        break
      } else if (tokenStack.expect('indention')) {
        tokenStack.goForward()

        while (true) {
          if (tokenStack.expect('identifier', 'from')) {
            break
          } else if (tokenStack.expect('indention')) {
            tokenStack.goForward()
            continue
          }

          this.specifiers.push(this.createImportSpecifierNode(tokenStack))
        }
      } else if (tokenStack.expect('punctuator', '{')) {
        tokenStack.goForward()

        while (true) {
          if (tokenStack.expect('punctuator', '}')) {
            tokenStack.goForward()
            break
          } else if (tokenStack.expect('punctuator', ',')) {
            tokenStack.goForward()
            continue
          }

          this.specifiers.push(this.createImportSpecifierNode(tokenStack))
        }
      } else if (tokenStack.expect('operator', '*')) {
        this.specifiers.push(this.createImportNamespaceSpecifierNode(tokenStack))
      } else if (tokenStack.expect('operator', '**')) {
        this.specifiers.push(this.createImportDefaultSpecifierNode(tokenStack))
      } else if (tokenStack.expect('punctuator', ',')) {
        tokenStack.goForward()
        continue
      } else if (tokenStack.expect('identifier')) {
        this.specifiers.push(this.createImportSpecifierNode(tokenStack))
      } else {
        this.syntaxError('Unexpected token', nextToken)
        break
      }
    }

    this.source = this.createNodeItem(tokenStack)
  }

  toJSON () {
    return this.createJSON({
      type: 'ImportDeclaration',
      source: this.source.toJSON(),
      specifiers: this.specifiers.map((item) => item.toJSON())
    })
  }
}

module.exports = ImportDeclaration
