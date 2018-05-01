const FireScriptElement = require('./FireScriptElement')

/**
 * FunctionExpression
 *
 * @class FunctionExpression
 * @extends FireScriptElement
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
class FunctionExpression extends FireScriptElement {
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

  toFSString (ctx) {
    const id = this.id ? this.id.toFSString(ctx) + ' ' : ''
    const func = this.async ? 'async '
      : this.generator ? 'gen '
        : this.isPropertyMethod() ? ''
          : 'func '

    return this.renderElement(
      func + id +
      '(' +
      ctx.join(this.params, ', ') +
      ')' +
      this.body.toFSString(ctx)
    )
  }
}

module.exports = FunctionExpression
