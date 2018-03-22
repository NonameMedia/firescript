const JSElement = require('./JSElement')

/**
 * ReturnStatement
 *
 * @class ReturnStatement
 * @extends JSElement
 *
 * interface ReturnStatement {
    type: 'ReturnStatement';
    argument: Expression | null;
}
*/
class ReturnStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.argument = this.createElement(ast.argument)
  }

  toESString (ctx) {
    return 'return ' +
      this.argument.toESString(ctx) +
      ';'
  }
}

module.exports = ReturnStatement
