const FireScriptElement = require('./FireScriptElement')

/**
 * ExportAllDeclaration
 *
 * @class ExportAllDeclaration
 * @extends FireScriptElement
 *
 * interface ExportAllDeclaration {
 *   type: 'ExportAllDeclaration';
 *   source: Literal;
 * }
 */
class ExportAllDeclaration extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.source = this.createElement(ast.source)
  }

  toESString (ctx) {
    return this.renderElement('export * from ' +
      this.source.toESString(ctx) +
      ';'
    )
  }
}

module.exports = ExportAllDeclaration
