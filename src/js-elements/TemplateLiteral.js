const JSElement = require('./JSElement')

/**
 * TemplateLiteral
 *
 * @class TemplateLiteral
 * @extends JSElement
 *
 * interface TemplateLiteral {
    type: 'TemplateLiteral';
    quasis: TemplateElement[];
    expressions: Expression[];
}
*/
class TemplateLiteral extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element TemplateLiteral is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = TemplateLiteral
