const FireScriptElement = require('./FireScriptElement')

/**
 * TaggedTemplateExpression
 *
 * @class TaggedTemplateExpression
 * @extends FireScriptElement
 *
 * interface TaggedTemplateExpression {
 *   type: 'TaggedTemplateExpression';
 *   readonly tag: Expression;
 *   readonly quasi: TemplateLiteral;
 * }
 */
class TaggedTemplateExpression extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.tag = this.createElement(ast.tag)
    this.quasi = this.createElement(ast.quasi)
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
