const SuperArray = require('superarr')
const FirescriptElement = require('./FirescriptElement')

/**
 * TemplateLiteral
 *
 * @class TemplateLiteral
 * @extends FirescriptElement
 *
 * interface TemplateLiteral {
 *   type: 'TemplateLiteral';
 *   quasis: TemplateElement[];
 *   expressions: Expression[];
 * }
 */
class TemplateLiteral extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.quasis = this.createElementList(ast.quasis)
    this.expressions = this.createElementList(ast.expressions)
  }

  toFSString (ctx) {
    const elements = SuperArray.merge(this.quasis, this.expressions)
    elements[0].head = true
    return this.renderElement(
      '\'' +
      ctx.join(elements, '') +
      '\''
    )
  }
}

module.exports = TemplateLiteral
