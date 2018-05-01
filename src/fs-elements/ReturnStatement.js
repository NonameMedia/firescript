const FireScriptElement = require('./FireScriptElement')

/**
 * ReturnStatement
 *
 * @class ReturnStatement
 * @extends FireScriptElement
 *
 * interface ReturnStatement {
    type: 'ReturnStatement';
    argument: Expression | null;
}
*/
class ReturnStatement extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.argument = this.createElement(ast.argument)
  }

  toFSString (ctx) {
    return this.renderElement(
      'return ' +
      this.argument.toFSString(ctx)
    )
  }
}

module.exports = ReturnStatement
