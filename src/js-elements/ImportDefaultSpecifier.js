const JSElement = require('./JSElement')

/**
 * ImportDefaultSpecifier
 *
 * @class ImportDefaultSpecifier
 * @extends JSElement
 *
 * interface ImportDefaultSpecifier {
 *   type: 'ImportDefaultSpecifier'
 *   local: Identifier
 * }
 */
class ImportDefaultSpecifier extends JSElement {
  constructor (ast) {
    super(ast)

    this.local = this.createElement(ast.local)
  }

  compile (buffer) {
    buffer.write(this.local)
  }

  toESString (ctx) {
    return this.renderElement(
      this.local.toESString(ctx)
    )
  }
}

module.exports = ImportDefaultSpecifier
