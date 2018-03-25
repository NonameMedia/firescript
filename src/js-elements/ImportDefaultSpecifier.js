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

  toESString (ctx) {
    return this.local.toESString(ctx)
  }
}

module.exports = ImportDefaultSpecifier
