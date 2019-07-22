const FirescriptElement = require('./FirescriptElement')

/**
 * ExportDefaultDeclaration
 *
 * @class ExportDefaultDeclaration
 * @extends FirescriptElement
 *
 * interface ExportDefaultDeclaration {
 *   type: 'ExportDefaultDeclaration';
 *   declaration: Identifier | BindingPattern | ClassDeclaration | Expression | FunctionDeclaration;
 * }
 */
class ExportDefaultDeclaration extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.declaration = this.createElement(ast.declaration)
  }

  toFSString (ctx) {
    return this.renderElement(
      'export ** ' +
      this.declaration.toFSString(ctx)
    )
  }
}

module.exports = ExportDefaultDeclaration
