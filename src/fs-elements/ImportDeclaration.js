const FirescriptElement = require('./FirescriptElement')

/**
 * ImportDeclaration
 *
 * @class ImportDeclaration
 * @extends FirescriptElement
 *
 * interface ImportDeclaration {
 *   type: 'ImportDeclaration'
 *   specifiers: ImportSpecifier[];
 *   source: Literal;
 * }
 */
class ImportDeclaration extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.specifiers = this.createElementList(ast.specifiers)
    this.source = this.createElement(ast.source)
  }

  toFSString (ctx) {
    const useMultiline = this.specifiers.length > 2

    if (useMultiline) {
      return this.renderMultiline(ctx)
    }

    return this.renderInline(ctx)
  }

  getSpecifiers (ctx) {
    let prevSpecifier = null
    let specifiers = []

    for (const item of this.specifiers) {
      let curSpecifier = ''

      if (item.type === 'ImportSpecifier' && prevSpecifier !== 'ImportSpecifier') {
        prevSpecifier = 'ImportSpecifier'
      }

      curSpecifier += item.toFSString(ctx)

      specifiers.push(curSpecifier)
    }

    return specifiers
  }

  renderMultiline (ctx) {
    const indention = ctx.indent(+1)
    const specifiers = this.getSpecifiers(ctx)
    ctx.indent(-1)

    return this.renderElement(
      'import' +
      indention +
      specifiers.join(indention) +
      indention +
      'from ' +
      this.source.toFSString(ctx)
    )
  }

  renderInline (ctx) {
    const specifiers = this.getSpecifiers(ctx)
    return this.renderElement(
      'import ' +
      specifiers.join(', ') +
      ' from ' +
      this.source.toFSString(ctx)
    )
  }
}

module.exports = ImportDeclaration
