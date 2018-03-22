const JSElement = require('./JSElement')

/**
 * YieldExpression
 *
 * @class YieldExpression
 * @extends JSElement
 *
 * interface YieldExpression {
 *   type: 'YieldExpression';
 *   argument: Expression | null;
 *   delegate: boolean;
 * }
 */
class YieldExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.argument = this.createElement(ast.argument)
    this.delegate = ast.delegate
  }

  toESString (ctx) {
    const delegate = this.delegate ? '* ' : ''
    return 'yield ' +
      delegate +
      this.argument.toESString(ctx)
  }
}

module.exports = YieldExpression
