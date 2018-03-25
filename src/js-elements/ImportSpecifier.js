const JSElement = require('./JSElement')

/**
 * ImportSpecifier
 *
 * @class ImportSpecifier
 * @extends JSElement
 *
 * interface ImportSpecifier {
 *   type: 'ImportSpecifier'
 *   local: Identifier;
 *   imported?: Identifier;
 * }
 */
class ImportSpecifier extends JSElement {
  constructor (ast) {
    super(ast)

    this.local = this.createElement(ast.local)
    this.imported = ast.imported ? this.createElement(ast.imported) : null
  }

  toESString (ctx) {
    if (this.imported) {
      if (this.imported.name === this.local.name) {
        return this.local.toESString(ctx)
      }

      return this.imported.toESString(ctx) +
        ' as ' +
        this.local.toESString(ctx)
    }

    return this.local.toESString(ctx)
  }
}

module.exports = ImportSpecifier
