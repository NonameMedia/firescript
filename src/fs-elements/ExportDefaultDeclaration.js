const FireScriptElement = require('./FireScriptElement')

/**
 * ExportDefaultDeclaration
 *
 * @class ExportDefaultDeclaration
 * @extends FireScriptElement
 *
 * interface ExportDefaultDeclaration {
 *   type: 'ExportDefaultDeclaration';
 *   declaration: Identifier | BindingPattern | ClassDeclaration | Expression | FunctionDeclaration;
 * }
 */
class ExportDefaultDeclaration extends FireScriptElement {
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
