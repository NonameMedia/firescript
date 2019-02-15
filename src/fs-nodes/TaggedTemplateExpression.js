const FirescriptNode = require('./FirescriptNode')

/**
 * Tagged Template Expression
 *
 * interface TaggedTemplateExpression {
 *   type: 'TaggedTemplateExpression';
 *   tag: Expression;
 *   quasi: TemplateLiteral;
 * }
 *
 * @class TaggedTemplateExpression
 * @extends FirescriptNode
 */
class TaggedTemplateExpression extends FirescriptNode {
  constructor (tokenStack, parent, tag) {
    super(tokenStack, parent)

    this.tag = tag || this.createFullNode(tokenStack)
    if (!this.isExpressionNode(this.tag)) {
      this.syntaxError(`Node ${this.tag.type} is not an Expression node`)
    }

    this.quasi = this.createTempalteLiteralNode(tokenStack)
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'TaggedTemplateExpression',
      tag: this.tag.toJSON(ctx),
      quasi: this.quasi.toJSON(ctx)
    })
  }
}

module.exports = TaggedTemplateExpression
