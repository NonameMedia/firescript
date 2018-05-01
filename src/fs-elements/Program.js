const FireScriptElement = require('./FireScriptElement')

/**
 * Program
 *
 * @class Program
 * @extends FireScriptElement
 *
 * interface Program {
 *   type: 'Program';
 *   sourceType: 'module';
 *   body: ModuleItem[];
 * }
 */
class Program extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.body = this.createElementList(ast.body)
  }

  toFSString (ctx) {
    return this.renderElement(
      ctx.join(this.body, '\n') +
      '\n'
    )
  }
}

module.exports = Program
