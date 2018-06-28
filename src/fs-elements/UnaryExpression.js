const FireScriptElement = require('./FireScriptElement')

/**
 * UnaryExpression
 *
 * @class UnaryExpression
 * @extends FireScriptElement
 *
 * interface UnaryExpression {
    type: 'UnaryExpression';
    operator: '+' | '-' | '~' | '!' | 'delete' | 'void' | 'typeof';
    argument: Expression;
    prefix: true;
}
*/
class UnaryExpression extends FireScriptElement {
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
