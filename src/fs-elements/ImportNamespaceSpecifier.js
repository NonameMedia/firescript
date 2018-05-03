const FireScriptElement = require('./FireScriptElement')

/**
 * ImportNamespaceSpecifier
 *
 * @class ImportNamespaceSpecifier
 * @extends FireScriptElement
 *
 * interface ImportNamespaceSpecifier {
 *   type: 'ImportNamespaceSpecifier'
 *   local: Identifier
 * }
 */
class ImportNamespaceSpecifier extends FireScriptElement {
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
