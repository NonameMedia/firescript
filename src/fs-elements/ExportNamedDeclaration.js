const FirescriptElement = require('./FirescriptElement')

/**
 * ExportNamedDeclaration
 *
 * @class ExportNamedDeclaration
 * @extends FirescriptElement
 *
 * interface ExportNamedDeclaration {
 *   type: 'ExportNamedDeclaration';
 *   declaration: ClassDeclaration | FunctionDeclaration | VariableDeclaration;
 *   specifiers: ExportSpecifier[];
 *   source: Literal;
 * }
 */
class ExportNamedDeclaration extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.declaration = ast.declaration ? this.createElement(ast.declaration) : null
    this.specifiers = this.createElementList(ast.specifiers)
    this.source = ast.source ? this.createElement(ast.source) : null
  }

  toFSString (ctx) {
    if (this.declaration) {
      return this.renderElement(
        this.renderDeclaration(ctx)
      )
    } else {
      return this.renderElement(
        this.renderSpecifiers(ctx)
      )
    }
  }

  renderDeclaration (ctx) {
    const source = this.source ? ' from ' + this.source.toFSString(ctx) : ''

    return 'export ' +
      this.declaration.toFSString(ctx) +
      source
  }

  renderSpecifiers (ctx) {
    const source = this.source ? ' from ' + this.source.toFSString(ctx) : ''

    return 'export ' +
      ctx.join(this.specifiers, ', ') +
      source
  }
}

module.exports = ExportNamedDeclaration
