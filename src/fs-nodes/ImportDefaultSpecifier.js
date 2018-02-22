const FireScriptNode = require('./FireScriptNode')

/**
 * ImportDefaultSpecifier
 *
 * @class ImportDefaultSpecifier
 * @extends FireScriptNode
 *
 * interface ImportDefaultSpecifier {
 *     type: 'ImportDefaultSpecifier' | 'ImportDefaultSpecifier' | 'ImportNamespaceSpecifier';
 *     local: Identifier;
 *     imported?: Identifier;
 * }
 */
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
