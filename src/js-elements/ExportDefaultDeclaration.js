const JSElement = require('./JSElement')

/**
 * ExportDefaultDeclaration
 *
 * @class ExportDefaultDeclaration
 * @extends JSElement
 *
 * interface ExportDefaultDeclaration {
 *   type: 'ExportDefaultDeclaration';
 *   declaration: Identifier | BindingPattern | ClassDeclaration | Expression | FunctionDeclaration;
 * }
 */
class ExportDefaultDeclaration extends JSElement {
  constructor (ast) {
    super(ast)

    this.declaration = this.createElement(ast.declaration)
  }

  compile (buffer) {
    buffer.registerItem(this.location, 'export')
    buffer.write('export default ')
    buffer.write(this.declaration)
    buffer.write(';')
  }
}

module.exports = ExportDefaultDeclaration
