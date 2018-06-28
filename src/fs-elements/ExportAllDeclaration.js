const FirescriptElement = require('./FirescriptElement')

/**
 * ExportAllDeclaration
 *
 * @class ExportAllDeclaration
 * @extends FirescriptElement
 *
 * interface ExportAllDeclaration {
 *   type: 'ExportAllDeclaration';
 *   source: Literal;
 * }
 */
class ExportAllDeclaration extends FirescriptElement {
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
