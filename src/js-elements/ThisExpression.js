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

  toESString () {
    return this.renderElement('this')
  }

  getLength () {
    return 4
  }
}

module.exports = ThisExpression
