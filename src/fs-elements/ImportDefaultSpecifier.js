const FirescriptElement = require('./FirescriptElement')

/**
 * ImportDefaultSpecifier
 *
 * @class ImportDefaultSpecifier
 * @extends FirescriptElement
 *
 * interface ImportDefaultSpecifier {
 *   type: 'ImportDefaultSpecifier'
 *   local: Identifier
 * }
 */
class ImportDefaultSpecifier extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.local = this.createElement(ast.local)
  }

  toFSString (ctx) {
    return this.renderElement(
      '** as ' +
      this.local.toFSString(ctx)
    )
  }
}

module.exports = ImportDefaultSpecifier
