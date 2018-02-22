const FireScriptNode = require('./FireScriptNode')

const ALLOWED_CHILDS = [
  'Identifier'
]

/**
 * MetaProperty
 *
 * @class MetaProperty
 * @extends FireScriptNode
 *
 * interface MetaProperty {
 *   type: 'MetaProperty';
 *   meta: Identifier;
 *   property: Identifier;
 * }
 */
class MetaProperty extends FireScriptNode {
  constructor (tokenStack, parent, meta) {
    super(parent)

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

    tokenStack.print()
    if (!tokenStack.expect('punctuator', '.')) {
      this.syntaxError('Unexpected token', tokenStack.current())
    }

    tokenStack.goForward()

    this.property = this.createIdentifierNode(tokenStack)
    this.isAllowedNode(this.property, ALLOWED_CHILDS, tokenStack.current())
  }

  toJSON () {
    return {
      type: 'MetaProperty',
      meta: this.meta.toJSON(),
      property: this.property.toJSON()
    }
  }
}

module.exports = MetaProperty
