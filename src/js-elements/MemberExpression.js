const JSElement = require('./JSElement')

/**
 * MemberExpression
 *
 * @class MemberExpression
 * @extends JSElement
 *
 * interface MemberExpression {
    type: 'MemberExpression';
    computed: boolean;
    object: Expression;
    property: Expression;
}
*/
class MemberExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.object = this.createElement(ast.object)
    this.property = this.createElement(ast.property)
  }

  toESString (ctx) {
    return this.object.toESString(ctx) +
      '.' +
      this.property.toESString(ctx)
  }
}

module.exports = MemberExpression
