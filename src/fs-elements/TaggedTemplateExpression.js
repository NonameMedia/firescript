const FirescriptElement = require('./FirescriptElement')

/**
 * TaggedTemplateExpression
 *
 * @class TaggedTemplateExpression
 * @extends FirescriptElement
 *
 * interface TaggedTemplateExpression {
 *   type: 'TaggedTemplateExpression';
 *   readonly tag: Expression;
 *   readonly quasi: TemplateLiteral;
 * }
 */
class TaggedTemplateExpression extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.tag = this.createElement(ast.tag)
    this.quasi = this.createElement(ast.quasi)
  }

  toFSString (ctx) {
    return this.renderElement(
      this.tag.toFSString(ctx) +
      ' ' +
      this.quasi.toFSString(ctx)
    )
  }
}

module.exports = TaggedTemplateExpression
