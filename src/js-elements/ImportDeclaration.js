const JSElement = require('./JSElement')

/**
 * ImportDeclaration
 *
 * @class ImportDeclaration
 * @extends JSElement
 *
 * interface ImportDeclaration {
 *   type: 'ImportDeclaration'
 *   specifiers: ImportSpecifier[];
 *   source: Literal;
 * }
 */
class ImportDeclaration extends JSElement {
  constructor (ast) {
    super(ast)

    this.specifiers = this.createElementList(ast.specifiers)
    this.source = this.createElement(ast.source)
  }

  toESString (ctx) {
    return 'import ' +
      ctx.join(this.specifiers, ', ') +
      ' from ' +
      this.source.toESString(ctx) +
      ';'
  }
}

module.exports = ImportDeclaration
