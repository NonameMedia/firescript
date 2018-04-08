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
    return this.renderElement(
      'import ' +
      this.renderSpecifiers(ctx) +
      ' from ' +
      this.source.toESString(ctx) +
      ';'
    )
  }

  renderSpecifiers (ctx) {
    let prevSpecifier = null
    let specifiers = []
    let nextIndex = 0

    for (const item of this.specifiers) {
      let curSpecifier = ''
      nextIndex += 1
      let closer = ''

      if (item.type === 'ImportSpecifier' && prevSpecifier !== 'ImportSpecifier') {
        curSpecifier = '{ '
        prevSpecifier = 'ImportSpecifier'
      }

      if (item.type === 'ImportSpecifier') {
        const nextItem = this.specifiers[nextIndex]
        if (!nextItem || nextItem.type !== 'ImportSpecifier') {
          closer = ' }'
        }
      }

      curSpecifier += item.toESString(ctx)
      curSpecifier += closer

      specifiers.push(curSpecifier)
    }

    return specifiers.join(', ')
  }
}

module.exports = ImportDeclaration
