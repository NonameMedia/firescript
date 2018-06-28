const FirescriptElement = require('./FirescriptElement')

/**
 * ReturnStatement
 *
 * @class ReturnStatement
 * @extends FirescriptElement
 *
 * interface ReturnStatement {
    type: 'ReturnStatement';
    argument: Expression | null;
}
*/
class ReturnStatement extends FirescriptElement {
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
