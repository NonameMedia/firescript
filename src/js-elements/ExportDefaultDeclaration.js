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

  toESString (ctx) {
    return this.renderElement(
      'export default ' +
      this.declaration.toESString(ctx) +
      ';'
    )
  }
}

module.exports = ExportDefaultDeclaration
