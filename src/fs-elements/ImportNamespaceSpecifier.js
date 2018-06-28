const FirescriptElement = require('./FirescriptElement')

/**
 * ImportNamespaceSpecifier
 *
 * @class ImportNamespaceSpecifier
 * @extends FirescriptElement
 *
 * interface ImportNamespaceSpecifier {
 *   type: 'ImportNamespaceSpecifier'
 *   local: Identifier
 * }
 */
class ImportNamespaceSpecifier extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.local = this.createElement(ast.local)
  }

  toFSString (ctx) {
    return this.renderElement(
      '* as ' +
      this.local.toFSString(ctx)
    )
  }
}

module.exports = ImportNamespaceSpecifier
