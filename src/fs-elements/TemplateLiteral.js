const SuperArray = require('superarr')
const FireScriptElement = require('./FireScriptElement')

/**
 * TemplateLiteral
 *
 * @class TemplateLiteral
 * @extends FireScriptElement
 *
 * interface TemplateLiteral {
 *   type: 'TemplateLiteral';
 *   quasis: TemplateElement[];
 *   expressions: Expression[];
 * }
 */
class TemplateLiteral extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.quasis = this.createElementList(ast.quasis)
    this.expressions = this.createElementList(ast.expressions)
  }

  toESString (ctx) {
    const elements = SuperArray.merge(this.quasis, this.expressions)
    elements[0].head = true
    return this.renderElement(
      '`' +
      ctx.join(elements, '') +
      '`'
    )
  }
}

module.exports = TemplateLiteral
