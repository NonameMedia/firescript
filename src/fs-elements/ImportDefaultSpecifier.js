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

  toESString (ctx) {
    return this.renderElement(
      this.local.toESString(ctx)
    )
  }
}

module.exports = ImportDefaultSpecifier
