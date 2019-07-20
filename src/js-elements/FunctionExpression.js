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
    this.body = ast.body ? this.createElement(ast.body) : null
    this.async = ast.async
    this.generator = ast.generator
  }

  isPropertyMethod () {
    const parent = this.parent || {}
    return (parent.type === 'MethodDefinition' || (
      parent.type === 'Property' &&
      parent.method === true))
  }

  compile (buffer) {
    const generator = this.generator ? ' *' : ''
    const func = this.isPropertyMethod() ? '' : 'function'
    const async = this.async ? 'async ' : ''
    const funcNameSpacing = func ? ' ' : ''
    const funcArgSpacing = this.id || (!func && !this.id) ? ' ' : ''

    buffer.write(async + func + generator + funcNameSpacing)
    buffer.write(this.id)
    buffer.write(funcArgSpacing + '(')
    buffer.loop(this.params, ', ')
    buffer.write(') ')
    buffer.write(this.body, '{}')
  }
}

module.exports = FunctionExpression
