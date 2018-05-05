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

  toFSString (ctx) {
    return this.renderElement(
      'export ** ' +
      this.declaration.toFSString(ctx)
    )
  }
}

module.exports = ExportDefaultDeclaration
