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
    const body = this.body.map((item, index, arr) => {
      const str = item.toFSString(ctx)
      if (/^Import/.test(item.type)) {
        const next = arr[index + 1]
        if (next && !/^Import/.test(next.type)) {
          return str + '\n'
        }
      }

      return str
    }).join('\n').trim()

    return this.renderElement(
      body + '\n'
    )
  }
}

module.exports = Program
