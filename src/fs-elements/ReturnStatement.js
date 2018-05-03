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

    this.argument = ast.argument ? this.createElement(ast.argument) : null
  }

  toFSString (ctx) {
    const arg = this.argument === null ? '' : this.argument.toFSString(ctx)
    const argSpacing = arg ? ' ' : ''

    return this.renderElement(
      'return' +
      argSpacing +
      arg
    )
  }
}

module.exports = ReturnStatement
