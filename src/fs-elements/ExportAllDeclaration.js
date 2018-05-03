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

  toFSString (ctx) {
    return this.renderElement('export * from ' +
      this.source.toFSString(ctx)
    )
  }
}

module.exports = ExportAllDeclaration
