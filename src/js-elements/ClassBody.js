const JSElement = require('./JSElement')

/**
 * ClassBody
 *
 * @class ClassBody
 * @extends JSElement
 *
 * interface ClassBody {
 *   type: 'ClassBody';
 *   body: MethodDefinition[];
 * }
 */
class ClassBody extends JSElement {
  constructor (ast) {
    super(ast)

    this.body = this.createElementList(ast.body)
  }

  toESString (ctx) {
    if (this.body.length === 0) {
      return '{}'
    }

    return '{' +
      ctx.indent(1) +
      ctx.join(this.body, '\n' + ctx.indent()) +
      ctx.indent(-1) +
      '}'
  }
}

module.exports = ClassBody
