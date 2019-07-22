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
    buffer.registerItem(this.location)
    buffer.write('export * ')

    const loc = Object.assign({}, this.location)
    loc.column += 9
    buffer.registerItem(loc)
    buffer.write('from ')
    buffer.write(this.source)
    buffer.write(';')
  }
}

module.exports = ExportAllDeclaration
