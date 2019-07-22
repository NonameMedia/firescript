const JSElement = require('./JSElement')

/**
 * ImportNamespaceSpecifier
 *
 * @class ImportNamespaceSpecifier
 * @extends JSElement
 *
 * interface ImportNamespaceSpecifier {
 *   type: 'ImportNamespaceSpecifier'
 *   local: Identifier
 * }
 */
class ImportNamespaceSpecifier extends JSElement {
  constructor (ast) {
    super(ast)

    this.local = this.createElement(ast.local)
  }

  compile (buffer) {
    buffer.write('* as ')
    buffer.write(this.local)
  }

  toESString (ctx) {
    return this.renderElement(
      '* as ' +
      this.local.toESString(ctx)
    )
  }
}

module.exports = ImportNamespaceSpecifier
