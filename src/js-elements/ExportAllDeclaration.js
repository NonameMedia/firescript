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

  compile (buffer) {
    buffer.registerItem(this.location, 'export')
    buffer.write('export * from ')
    buffer.write(this.source)
    buffer.write(';')
  }

  toESString (ctx) {
    return this.renderElement('export * from ' +
      this.source.toESString(ctx) +
      ';'
    )
  }
}

module.exports = ExportAllDeclaration
