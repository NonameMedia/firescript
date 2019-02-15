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

  toESString (ctx) {
    const local = this.exported.name === this.local.name
      ? ''
      : ' as ' + this.local.toESString()

    return this.renderElement(
      this.exported.toESString(ctx) +
      local
    )
  }
}

module.exports = ExportSpecifier
