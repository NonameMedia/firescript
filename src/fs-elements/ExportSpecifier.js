const FireScriptElement = require('./FireScriptElement')

/**
 * ExportSpecifier
 *
 * @class ExportSpecifier
 * @extends FireScriptElement
 *
 * interface ExportSpecifier {
 *   type: 'ExportSpecifier';
 *   exported: Identifier;
 *   local: Identifier;
 * }
 */
class ExportSpecifier extends FireScriptElement {
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
