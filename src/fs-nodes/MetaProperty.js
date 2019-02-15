const FirescriptNode = require('./FirescriptNode')

const ALLOWED_CHILDS = [
  'Identifier'
]

/**
 * MetaProperty
 *
 * @class MetaProperty
 * @extends FirescriptNode
 *
 * interface MetaProperty {
 *   type: 'MetaProperty';
 *   meta: Identifier;
 *   property: Identifier;
 * }
 */
class MetaProperty extends FirescriptNode {
  constructor (tokenStack, parent, meta) {
    super(tokenStack, parent)

    if (meta) {
      this.meta = meta
    } else {
      if (!tokenStack.expect('keyword', 'new')) {
        this.syntaxError('Unexpected token! new keyword expected')
      }

      const token = tokenStack.next()
      this.meta = this.createIdentifierNode(tokenStack, token.value)
    }

    this.isAllowedNode(this.meta, ALLOWED_CHILDS, tokenStack.current())

    if (!tokenStack.expect('punctuator', '.')) {
      this.syntaxError('Unexpected token', tokenStack.current())
    }

    tokenStack.goForward()

    this.property = this.createIdentifierNode(tokenStack)
    this.isAllowedNode(this.property, ALLOWED_CHILDS, tokenStack.current())
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'MetaProperty',
      meta: this.meta.toJSON(ctx),
      property: this.property.toJSON(ctx)
    })
  }
}

module.exports = MetaProperty
