const JSElement = require('./JSElement')

/**
 * UnaryExpression
 *
 * @class UnaryExpression
 * @extends JSElement
 *
 * interface UnaryExpression {
    type: 'UnaryExpression';
    operator: '+' | '-' | '~' | '!' | 'delete' | 'void' | 'typeof';
    argument: Expression;
    prefix: true;
}
*/
class UnaryExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.argument = this.createElement(ast.argument)
    this.operator = ast.operator
  }

  toESString (ctx) {
    return this.renderElement(
      `${this.operator}${this.argument.toESString(ctx)}`
    )
  }
}

module.exports = UnaryExpression
