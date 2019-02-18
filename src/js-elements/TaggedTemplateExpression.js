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
    buffer.registerItem(this.location, 'class')
    buffer.write(this.tag)
    buffer.write(' ')
    buffer.write(this.quasi)
  }

  toESString (ctx) {
    return this.renderElement(
      this.tag.toESString(ctx) +
      ' ' +
      this.quasi.toESString(ctx)
    )
  }
}

module.exports = TaggedTemplateExpression
