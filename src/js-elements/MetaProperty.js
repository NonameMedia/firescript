const JSElement = require('./JSElement')

/**
 * MetaProperty
 *
 * @class MetaProperty
 * @extends JSElement
 *
 * interface MetaProperty {
  type: 'MetaProperty';
  meta: Identifier;
  property: Identifier;
}
*/
class MetaProperty extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element MetaProperty is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = MetaProperty
