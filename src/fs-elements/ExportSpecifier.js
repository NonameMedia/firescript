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
