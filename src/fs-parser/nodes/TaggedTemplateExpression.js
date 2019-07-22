const Node = require('./Node')
const constants = require('../../utils/constants')

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
 * @extends Node
 */
class TaggedTemplateExpression extends Node {
  constructor (parser, tag) {
    super(parser)

    this.tag = tag || parser.nextNode(this)
    this.isAllowedNode(this.tag, constants.EXPRESSIONS)

    this.quasi = parser.createNode('TemplateLiteral')
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'TaggedTemplateExpression',
      tag: this.tag.resolve(ctx),
      quasi: this.quasi.resolve(ctx)
    })
  }
}

module.exports = TaggedTemplateExpression
