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

  compile (buffer) {
    buffer.registerItem(this.location, 'import')
    buffer.write('import ')

    let prevSpecifier = null
    this.specifiers.forEach((item, index) => {
      if (item.type === 'ImportSpecifier' && prevSpecifier !== 'ImportSpecifier') {
        buffer.write('{ ')
        prevSpecifier = 'ImportSpecifier'
      }

      buffer.write(item)

      if (item.type === 'ImportSpecifier') {
        const nextItem = this.specifiers[index + 1]
        if (!nextItem || nextItem.type !== 'ImportSpecifier') {
          buffer.write(' }')
        } else if (!nextItem || nextItem.type === 'ImportSpecifier') {
          buffer.write(', ')
        }
      }
    })

    buffer.write(' from ')
    buffer.write(this.source)
    buffer.write(';')
  }

  toESString (ctx) {
    if (ctx.esModules) {
      return this.useESModules(ctx)
    }

    return this.useCommonModules(ctx)
  }

  useESModules (ctx) {
    return this.renderElement(
      'import ' +
      this.renderSpecifiers(ctx) +
      ' from ' +
      this.source.toESString(ctx) +
      ';'
    )
  }

  renderSpecifiers (buffer) {
    let prevSpecifier = null
    let specifiers = []
    let nextIndex = 0

    for (const item of this.specifiers) {
      nextIndex += 1

      if (item.type === 'ImportSpecifier' && prevSpecifier !== 'ImportSpecifier') {
        buffer.write('{ ')
        prevSpecifier = 'ImportSpecifier'
      }

      buffer.write(item)

      if (item.type === 'ImportSpecifier') {
        const nextItem = this.specifiers[nextIndex]
        if (!nextItem || nextItem.type !== 'ImportSpecifier') {
          buffer.write(' }')
        }
      }
    }

    return specifiers.join(', ')
  }
}

module.exports = ImportDeclaration
