const FireScriptElement = require('./FireScriptElement')

/**
 * ImportDefaultSpecifier
 *
 * @class ImportDefaultSpecifier
 * @extends FireScriptElement
 *
 * interface ImportDefaultSpecifier {
 *   type: 'ImportDefaultSpecifier'
 *   local: Identifier
 * }
 */
class ImportDefaultSpecifier extends FireScriptElement {
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
