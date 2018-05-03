const FireScriptElement = require('./FireScriptElement')

/**
 * YieldExpression
 *
 * @class YieldExpression
 * @extends FireScriptElement
 *
 * interface YieldExpression {
 *   type: 'YieldExpression';
 *   argument: Expression | null;
 *   delegate: boolean;
 * }
 */
class YieldExpression extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.argument = this.createElement(ast.argument)
    this.delegate = ast.delegate
  }

  toFSString (ctx) {
    const delegate = this.delegate ? '* ' : ''
    return this.renderElement(
      'yield ' +
      delegate +
      this.argument.toFSString(ctx)
    )
  }
}

module.exports = YieldExpression
