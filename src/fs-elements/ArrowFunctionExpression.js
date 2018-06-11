const FireScriptElement = require('./FireScriptElement')

/**
 * ArrowFunctionExpression
 *
 * @class ArrowFunctionExpression
 * @extends FireScriptElement
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
class ArrowFunctionExpression extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.params = this.createElementList(ast.params)
    this.body = this.createElement(ast.body)
    this.async = ast.async
    this.expression = ast.expression
  }

  toFSString (ctx) {
    const asyncfn = this.async ? 'async ' : ''

    return this.renderElement(
      asyncfn +
      '(' +
      ctx.join(this.params, ', ') +
      ')' +
      ' =>' +
      this.body.toFSString(ctx)
    )
  }
}

module.exports = ArrowFunctionExpression
