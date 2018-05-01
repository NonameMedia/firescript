const FireScriptElement = require('./FireScriptElement')

/**
 * ClassBody
 *
 * @class ClassBody
 * @extends FireScriptElement
 *
 * interface ClassBody {
 *   type: 'ClassBody';
 *   body: MethodDefinition[];
 * }
 */
class ClassBody extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.body = this.createElementList(ast.body)
  }

  toFSString (ctx) {
    if (this.body.length === 0) {
      return '\n'
    }

    return this.renderElement(
      ctx.indent(1) +
      ctx.join(this.body, ctx.indent()) +
      ctx.indent(-1)
    )
  }
}

module.exports = ClassBody
