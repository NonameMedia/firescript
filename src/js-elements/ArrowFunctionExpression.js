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

  toString () {
    return `(${this.param.join(', ')}) => ${this.body};`
  }
}

module.exports = ArrowFunctionExpression
