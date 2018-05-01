const FireScriptElement = require('./FireScriptElement')

/**
 * ImportSpecifier
 *
 * @class ImportSpecifier
 * @extends FireScriptElement
 *
 * interface ImportSpecifier {
 *   type: 'ImportSpecifier'
 *   local: Identifier;
 *   imported?: Identifier;
 * }
 */
class ImportSpecifier extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.local = this.createElement(ast.local)
    this.imported = ast.imported ? this.createElement(ast.imported) : null
  }

  toESString (ctx) {
    if (this.imported) {
      if (this.imported.name === this.local.name) {
        return this.renderElement(
          this.local.toESString(ctx)
        )
      }

      return this.renderElement(
        this.imported.toESString(ctx) +
        ' as ' +
        this.local.toESString(ctx)
      )
    }

    return this.renderElement(
      this.local.toESString(ctx)
    )
  }
}

module.exports = ImportSpecifier
