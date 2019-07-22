const FirescriptElement = require('./FirescriptElement')

/**
 * ExportSpecifier
 *
 * @class ExportSpecifier
 * @extends FirescriptElement
 *
 * interface ExportSpecifier {
 *   type: 'ExportSpecifier';
 *   exported: Identifier;
 *   local: Identifier;
 * }
 */
class ExportSpecifier extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.exported = this.createElement(ast.exported)
    this.local = this.createElement(ast.local)
  }

  toFSString (ctx) {
    const local = this.exported.name === this.local.name
      ? ''
      : ' as ' + this.local.toFSString()

    return this.renderElement(
      this.exported.toFSString(ctx) +
      local
    )
  }
}

module.exports = ExportSpecifier
