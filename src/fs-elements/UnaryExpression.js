const FirescriptElement = require('./FirescriptElement')

/**
 * UnaryExpression
 *
 * @class UnaryExpression
 * @extends FirescriptElement
 *
 * interface UnaryExpression {
    type: 'UnaryExpression';
    operator: '+' | '-' | '~' | '!' | 'delete' | 'void' | 'typeof';
    argument: Expression;
    prefix: true;
}
*/
class UnaryExpression extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.operator = ast.operator
    this.argument = this.createElement(ast.argument)
  }

  toFSString () {
    return this.renderElement(
      `${this.operator} ${this.argument.toFSString()}`
    )
  }
}

module.exports = UnaryExpression
