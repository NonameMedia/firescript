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

  toFSString (ctx) {
    if (this.imported) {
      if (this.imported.name === this.local.name) {
        return this.renderElement(
          this.local.toFSString(ctx)
        )
      }

      return this.renderElement(
        this.imported.toFSString(ctx) +
        ' as ' +
        this.local.toFSString(ctx)
      )
    }

    return this.renderElement(
      this.local.toFSString(ctx)
    )
  }
}

module.exports = ImportSpecifier
