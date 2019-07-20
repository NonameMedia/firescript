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

  compile (buffer) {
    buffer.registerItem(this.location)

    const asyncfn = this.async ? 'async ' : ''
    buffer.write(asyncfn)
    buffer.write('(')
    buffer.loop(this.params, ', ')
    buffer.write(') => ')
    buffer.write(this.body)
  }

  getLineLength () {
    const bodyLen = this.body.getLineLength()
    const paramLen = this.params.reduce((num, item) => {
      return num + item.getLineLength()
    }, Math.max(0, (this.params.length - 1) * 2))
    const len = this.async ? 12 : 6
    return len + paramLen + bodyLen
  }
}

module.exports = ArrowFunctionExpression
