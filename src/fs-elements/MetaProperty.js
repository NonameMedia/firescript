const FirescriptElement = require('./FirescriptElement')

/**
 * MetaProperty
 *
 * @class MetaProperty
 * @extends FirescriptElement
 *
 * interface MetaProperty {
 *   type: 'MetaProperty';
 *   meta: Identifier;
 *   property: Identifier;
 * }
 */
class MetaProperty extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.meta = this.createElement(ast.meta)
    this.property = this.createElement(ast.property)
  }

  toFSString (ctx) {
    return this.renderElement(
      this.meta.toFSString(ctx) +
      '.' +
      this.property.toFSString(ctx)
    )
  }
}

module.exports = MetaProperty
