const JSElement = require('./JSElement')

/**
 * ExportAllDeclaration
 *
 * @class ExportAllDeclaration
 * @extends JSElement
 *
 * interface ExportAllDeclaration {
 *   type: 'ExportAllDeclaration';
 *   source: Literal;
 * }
 */
class ExportAllDeclaration extends JSElement {
  constructor (ast) {
    super(ast)

    this.source = this.createElement(ast.source)
  }

  toESString (ctx) {
    return 'export * from ' +
      this.source.toESString(ctx) +
      ';'
  }
}

module.exports = ExportAllDeclaration
