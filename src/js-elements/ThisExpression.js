const JSElement = require('./JSElement')

/**
 * ThisExpression
 *
 * @class ThisExpression
 * @extends JSElement
 *
 * interface ThisExpression {
 *   type: 'ThisExpression';
 * }
 */
class ThisExpression extends JSElement {
  constructor (ast) {
    super(ast)
  }

  compile (buffer) {
    buffer.registerItem(this.location)
    buffer.write('this')
  }

  toESString () {
    return this.renderElement('this')
  }
}

module.exports = ThisExpression
