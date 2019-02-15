const FirescriptNode = require('./FirescriptNode')

/**
 * ExportSpecifier
 *
 * @class ExportSpecifier
 * @extends FirescriptNode
 *
 * interface ExportSpecifier {
 *     type: 'ExportSpecifier'
 *     local: Identifier;
 *     exporte?: Identifier;
 * }
 */
class ExportSpecifier extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    this.exported = this.createIdentifierNode(tokenStack)
    this.local = this.exported

    const nextToken = tokenStack.current()
    if (nextToken.value === 'as') {
      tokenStack.next()
      this.local = this.createIdentifierNode(tokenStack)
    }
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'ExportSpecifier',
      local: this.local.toJSON(ctx),
      exported: this.exported.toJSON(ctx)
    })
  }
}

module.exports = ExportSpecifier
