const JSElement = require('./JSElement')

/**
 * FunctionExpression
 *
 * @class FunctionExpression
 * @extends JSElement
 *
 * interface FunctionExpression {
 *   type: 'FunctionExpression';
 *   id: Identifier | null;
 *   params: FunctionParameter[];
 *   body: BlockStatement;
 *   generator: boolean;
 *   async: boolean;
 *   expression: boolean;
 * }
*/
class FunctionExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.id = ast.id ? this.createElement(ast.id) : null
    this.params = this.createElementList(ast.params)
    this.body = this.createElement(ast.body, null)
    this.async = ast.async
    this.generator = ast.generator
  }

  isPropertyMethod () {
    const parent = this.parent || {}
    return (parent.type === 'MethodDefinition' || (
      parent.type === 'Property' &&
      parent.method === true))
  }

  toESString (ctx) {
    const id = this.id ? this.id.toESString(ctx) : ''
    const generator = this.generator ? ' *' : ''
    const func = this.isPropertyMethod() ? '' : 'function'
    const async = this.async ? 'async ' : ''
    const funcNameSpacing = func ? ' ' : ''
    const funcArgSpacing = id || (!func && !id) ? ' ' : ''

    return this.renderElement(
      async + func + generator + funcNameSpacing + id + funcArgSpacing +
      '(' +
      ctx.join(this.params, ', ') +
      ') ' +
      this.body.toESString(ctx)
    )
  }
}

module.exports = FunctionExpression
