const FireScriptNode = require('./FireScriptNode')

class ImportDefaultSpecifier extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.local = this.createIdentifierNode(tokenStack)
  }

  toJSON () {
    return {
      type: 'ImportDefaultSpecifier',
      local: this.local.toJSON()
    }
  }
}

module.exports = ImportDefaultSpecifier
