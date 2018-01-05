const FireScriptNode = require('./FireScriptNode')

class ImportSpecifier extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.imported = this.createIdentifierNode(tokenStack)
    this.local = this.imported

    const nextToken = tokenStack[0]
    if (nextToken.value === 'as') {
      tokenStack.shift()
      this.local = this.createIdentifierNode(tokenStack)
    }
  }

  toJSON () {
    return {
      type: 'ImportSpecifier',
      local: this.local.toJSON(),
      imported: this.imported.toJSON()
    }
  }
}

module.exports = ImportSpecifier
