const Node = require('./Node')

const ALLOWED_CHILDS = [
  'Identifier'
]

/**
 * MetaProperty
 *
 * @class MetaProperty
 * @extends Node
 *
 * interface MetaProperty {
 *   type: 'MetaProperty';
 *   meta: Identifier;
 *   property: Identifier;
 * }
 */
class MetaProperty extends Node {
  constructor (parser, meta) {
    super(parser)

    if (meta) {
      this.meta = meta
    } else {
      if (!parser.match('keyword "new"')) {
        this.syntaxError('Unexpected token! new keyword expected')
      }

      this.meta = parser.createNode('Identifier')
    }

    this.isAllowedNode(this.meta, ALLOWED_CHILDS)

    if (!parser.match('punctuator "."')) {
      this.syntaxError('Unexpected token')
    }

    parser.skipNext()

    this.property = parser.createNode('Identifier')
    this.isAllowedNode(this.property, ALLOWED_CHILDS)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'MetaProperty',
      meta: this.meta.resolve(ctx),
      property: this.property.resolve(ctx)
    })
  }
}

module.exports = MetaProperty
