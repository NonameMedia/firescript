const FireScriptElement = require('./FireScriptElement')

/**
 * FunctionDeclaration
 *
 * @class FunctionDeclaration
 * @extends FireScriptElement
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
class FunctionDeclaration extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.id = ast.id ? this.createElement(ast.id) : null
    this.params = this.createElementList(ast.params)
    this.body = this.createElement(ast.body, null)
    this.async = ast.async
    this.generator = ast.generator
  }

  toFSString (ctx) {
    const id = this.id ? this.id.toFSString(ctx) + ' ' : ''
    const func = this.async ? 'async '
      : this.generator ? 'gen ' : 'func '

    return this.renderElement(
      func + id +
      '(' +
      ctx.join(this.params, ', ') +
      ')' +
      this.body.toFSString(ctx)
    )
  }
}

module.exports = FunctionDeclaration
