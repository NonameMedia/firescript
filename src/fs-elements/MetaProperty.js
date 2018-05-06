const FireScriptElement = require('./FireScriptElement')

/**
 * MetaProperty
 *
 * @class MetaProperty
 * @extends FireScriptElement
 *
 * interface MetaProperty {
 *   type: 'MetaProperty';
 *   meta: Identifier;
 *   property: Identifier;
 * }
 */
class MetaProperty extends FireScriptElement {
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
