const FireScriptNode = require('./FireScriptNode')

/**
 * Tagged Template Expression
 *
 * interface TaggedTemplateExpression {
 *   type: 'TaggedTemplateExpression';
 *   readonly tag: Expression;
 *   readonly quasi: TemplateLiteral;
 * }
 *
 * @class TaggedTemplateExpression
 * @extends FireScriptNode
 */
class TaggedTemplateExpression extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    const token = tokenStack.next()
    this.raw = token.value
  }

  toJSON () {
    return {
      type: 'TaggedTemplateExpression',
      tag: this.tag,
      quasi: this.quasi
    }
  }
}

module.exports = TaggedTemplateExpression
