const FireScriptNode = require('./FireScriptNode')

class ImportDeclaration extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    let token = tokenStack.next()
    if (!token.type === 'import') {
      this.syntaxError(`${token.value} is not a import declaration`)
    }

    this.specifiers = []
    this.hasDefaultSpecifier = tokenStack.lookForward('identifier', 'from', 1)

    while (true) {
      const nextToken = tokenStack.current()
      if (nextToken.type === 'identifier') {
        if (nextToken.value === 'from') {
          tokenStack.next()
          break
        }

        if (this.hasDefaultSpecifier) {
          this.specifiers.push(this.createImportDefaultSpecifierNode(tokenStack))
        } else {
          this.specifiers.push(this.createImportSpecifierNode(tokenStack))
        }
      } else if (nextToken.type === 'punctuator' && nextToken.value === ',') {
        tokenStack.next()
        continue
      } else {
        this.syntaxError('Unexpected token', nextToken)
        break
      }
    }

    this.source = this.createNode(tokenStack)
  }

  toJSON () {
    return {
      type: 'ImportDeclaration',
      source: this.source.toJSON(),
      specifiers: this.specifiers.map((item) => item.toJSON())
    }
  }
}

module.exports = ImportDeclaration