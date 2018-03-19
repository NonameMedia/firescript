const JSElement = require('./JSElement')

/**
 * TemplateElement
 *
 * @class TemplateElement
 * @extends JSElement
 *
 * interface TemplateElement {
    type: 'TemplateElement';
    value: { cooked: string; raw: string };
    tail: boolean;
}
*/
class TemplateElement extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element TemplateElement is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = TemplateElement
