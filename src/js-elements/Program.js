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

  toESString (ctx) {
    return ctx.join(this.body, '\n') +
      '\n'
  }
}

module.exports = Program
