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

  compile (buffer) {
    const operatorSpace = /^\w+$/.test(this.operator) ? ' ' : ''

    buffer.write(this.operator)
    buffer.write(operatorSpace)
    buffer.write(this.argument)
  }
}

module.exports = UnaryExpression
