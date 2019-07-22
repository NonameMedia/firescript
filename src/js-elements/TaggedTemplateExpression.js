const JSElement = require('./JSElement')

/**
 * TaggedTemplateExpression
 *
 * @class TaggedTemplateExpression
 * @extends JSElement
 *
 * interface TaggedTemplateExpression {
 *   type: 'TaggedTemplateExpression';
 *   readonly tag: Expression;
 *   readonly quasi: TemplateLiteral;
 * }
 */
class TaggedTemplateExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.tag = this.createElement(ast.tag)
    this.quasi = this.createElement(ast.quasi)
  }

  compile (buffer) {
    buffer.write(this.tag)
    buffer.write(' ')
    buffer.write(this.quasi)
  }
}

module.exports = TaggedTemplateExpression
