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
    this.body = ast.body ? this.createElement(ast.body, null) : null
    this.async = ast.async
    this.generator = ast.generator
  }

  compile (buffer) {
    const generator = this.generator ? '* ' : ''
    const func = this.id ? 'function ' : ''
    const async = this.async ? 'async ' : ''
    const funcArgSpacing = this.id || (!func && !this.id) ? ' ' : ''

    buffer.registerItem(this.location)
    buffer.write(async + func + generator)
    buffer.write(this.id)
    buffer.write(funcArgSpacing + '(')
    buffer.loop(this.params, ', ')
    buffer.write(') ')
    if (this.body) {
      buffer.writeItem(this.body)
    } else {
      buffer.write('{')
      buffer.write('}')
    }
  }
}

module.exports = FunctionDeclaration
