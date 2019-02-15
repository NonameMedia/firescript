const FirescriptNode = require('./FirescriptNode')

/**
 * ImportSpecifier
 *
 * @class ImportSpecifier
 * @extends FirescriptNode
 *
 * interface ImportSpecifier {
 *     type: 'ImportSpecifier' | 'ImportDefaultSpecifier' | 'ImportNamespaceSpecifier';
 *     local: Identifier;
 *     imported?: Identifier;
 * }
 */
class ImportSpecifier extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    this.imported = this.createIdentifierNode(tokenStack)
    this.local = this.imported

    const nextToken = tokenStack.current()
    if (nextToken.value === 'as') {
      tokenStack.next()
      this.local = this.createIdentifierNode(tokenStack)
    }
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'ImportSpecifier',
      local: this.local.toJSON(ctx),
      imported: this.imported.toJSON(ctx)
    })
  }
}

module.exports = ImportSpecifier
