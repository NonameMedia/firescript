const JSElement = require('./JSElement')

/**
 * Program
 *
 * @class Program
 * @extends JSElement
 *
 * interface Program {
 *   type: 'Program';
 *   sourceType: 'module';
 *   body: ModuleItem[];
 * }
 */
class Program extends JSElement {
  constructor (ast) {
    super(ast)

    this.body = this.createElementList(ast.body)
  }

  compile (buffer) {
    this.body.forEach((item, index) => {
      item.compile(buffer)
      buffer.nl(this.addEmptyLine(item, this.body[index + 1]) ? 2 : 1)
    })
  }

  addEmptyLine (item, next) {
    if (!next) {
      return false
    }

    return (
      (item.type === 'ImportDeclaration' && next.type !== 'ImportDeclaration') ||
      (!item.type.startsWith('Export') && next.type.startsWith('Export'))
    )
  }

  toESString (ctx) {
    return this.renderElement(
      ctx.join(this.body, '\n') +
      '\n'
    )
  }
}

module.exports = Program
