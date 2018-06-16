const JSElement = require('./JSElement')

/**
 * FunctionDeclaration
 *
 * @class FunctionDeclaration
 * @extends JSElement
 *
 * interface FunctionDeclaration {
 *  type: 'FunctionDeclaration';
 *  id: Identifier | null;
 *  params: FunctionParameter[];
 *  body: BlockStatement;
 *  generator: boolean;
 *  async: boolean;
 *  expression: false;
 * }
 */
class FunctionDeclaration extends JSElement {
  constructor (ast) {
    super(ast)

    this.id = ast.id ? this.createElement(ast.id) : null
    this.params = this.createElementList(ast.params)
    this.body = this.createElement(ast.body, null)
    this.async = ast.async
    this.generator = ast.generator
  }

  toESString (ctx) {
    const id = this.id ? this.id.toESString(ctx) : ''
    const generator = this.generator ? '* ' : ''
    const func = this.id ? 'function ' : ''
    const async = this.async ? 'async ' : ''
    const body = this.body ? this.body.toESString(ctx) : '{}'

    return this.renderElement(
      async + func + generator + id +
      ' (' +
      ctx.join(this.params, ', ') +
      ') ' +
      body
    )
  }
}

module.exports = FunctionDeclaration
