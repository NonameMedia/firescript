const JSElement = require('./JSElement')

/**
 * ArrowFunctionExpression
 *
 * @class ArrowFunctionExpression
 * @extends JSElement
 *
 * interface ArrowFunctionExpression {
 *   type: 'ArrowFunctionExpression';
 *   params: FunctionParameter[];
 *   body: BlockStatement;
 *   generator: boolean;
 *   async: boolean;
 *   expression: boolean;
 * }
 */
class ArrowFunctionExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.params = this.createElementList(ast.params)
    this.body = this.createElement(ast.body)
    this.async = ast.async
    this.expression = ast.expression
  }

  toESString (ctx) {
    const asyncfn = this.async ? 'async ' : ''

    return this.renderElement(
      asyncfn +
      '(' +
      ctx.join(this.params, ', ') +
      ') => ' +
      this.body.toESString(ctx)
    )
  }
}

module.exports = ArrowFunctionExpression
