const SuperArray = require('superarr')
const JSElement = require('./JSElement')

/**
 * TemplateLiteral
 *
 * @class TemplateLiteral
 * @extends JSElement
 *
 * interface TemplateLiteral {
 *   type: 'TemplateLiteral';
 *   quasis: TemplateElement[];
 *   expressions: Expression[];
 * }
 */
class TemplateLiteral extends JSElement {
  constructor (ast) {
    super(ast)

    this.quasis = this.createElementList(ast.quasis)
    this.expressions = this.createElementList(ast.expressions)
  }

  toESString (ctx) {
    const elements = SuperArray.merge(this.quasis, this.expressions)
    elements[0].head = true
    return '`' +
      ctx.join(elements, '') +
      '`'
  }
}

module.exports = TemplateLiteral
