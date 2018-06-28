const FirescriptNode = require('./FirescriptNode')

/**
 * ImportNamespaceSpecifier
 *
 * @class ImportNamespaceSpecifier
 * @extends FirescriptNode
 *
 * interface ImportDefaultSpNamespace {
 *     type: 'ImportDefaultSpecifier' | 'ImportDefaultSpecifier' | 'ImportNamespaceSpecifier';
 *     local: Identifier;
 *     imported?: Identifier;
 * }
 */
class ImportNamespaceSpecifier extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('operator', '*')) {
      this.syntaxError('Unexpected token! ImportNamespaceSpecifier expected')
    }

    tokenStack.goForward(2)
    this.local = this.createIdentifierNode(tokenStack)
  }

  toJSON () {
    return this.createJSON({
      type: 'ImportNamespaceSpecifier',
      local: this.local.toJSON()
    })
  }
}

module.exports = ImportNamespaceSpecifier
