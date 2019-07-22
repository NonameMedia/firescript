const JSElement = require('./JSElement')

/**
 * ExportSpecifier
 *
 * @class ExportSpecifier
 * @extends JSElement
 *
 * interface ExportSpecifier {
 *   type: 'ExportSpecifier';
 *   exported: Identifier;
 *   local: Identifier;
 * }
 */
class ExportSpecifier extends JSElement {
  constructor (ast) {
    super(ast)

    this.exported = this.createElement(ast.exported)
    this.local = this.createElement(ast.local)
  }

  compile (buffer) {
    buffer.write(this.exported)
    if (this.exported.name !== this.local.name) {
      buffer.write(' as ')
      buffer.write(this.local)
    }
  }
}

module.exports = ExportSpecifier
