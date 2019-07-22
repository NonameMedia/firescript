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

  compile (buffer) {
    // buffer.registerItem(this.location)
    if (this.imported) {
      if (this.imported.name === this.local.name) {
        buffer.write(this.local)
        return
      }

      buffer.write(this.imported)
      buffer.write(' as ')
    }

    buffer.write(this.local)
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
