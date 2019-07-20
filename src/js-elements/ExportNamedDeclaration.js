const JSElement = require('./JSElement')

/**
 * ExportNamedDeclaration
 *
 * @class ExportNamedDeclaration
 * @extends JSElement
 *
 * interface ExportNamedDeclaration {
 *   type: 'ExportNamedDeclaration';
 *   declaration: ClassDeclaration | FunctionDeclaration | VariableDeclaration;
 *   specifiers: ExportSpecifier[];
 *   source: Literal;
 * }
 */
class ExportNamedDeclaration extends JSElement {
  constructor (ast) {
    super(ast)

    this.declaration = ast.declaration ? this.createElement(ast.declaration) : null
    this.specifiers = this.createElementList(ast.specifiers)
    this.source = ast.source ? this.createElement(ast.source) : null
  }

  compile (buffer) {
    buffer.registerItem(this.location, 'export')
    buffer.write('export ')
    if (this.declaration) {
      buffer.write(this.declaration)
      if (this.source) {
        buffer.write(' from ')
        buffer.write(this.source)
      }
    } else if (this.specifiers) {
      buffer.write('{ ')
      buffer.loop(this.specifiers, ', ')
      buffer.write(' };')
    }
  }
}

module.exports = ExportNamedDeclaration
