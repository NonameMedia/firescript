const JSElement = require('./JSElement')

/**
 * Property
 *
 * @class Property
 * @extends JSElement
 *
 * interface Property {
    type: 'Property';
    key: Identifier | Literal;
    computed: boolean;
    value: AssignmentPattern | Identifier | BindingPattern | FunctionExpression | null;
    kind: 'get' | 'set' | 'init';
    method: false;
    shorthand: boolean;
}
*/
class Property extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element Property is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = Property
