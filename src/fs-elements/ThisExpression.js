const FirescriptElement = require('./FirescriptElement')

/**
 * ThisExpression
 *
 * @class ThisExpression
 * @extends FirescriptElement
 *
 * interface ThisExpression {
 *   type: 'ThisExpression';
 * }
 */
class ThisExpression extends FirescriptElement {
  // constructor (ast) {
  //   super(ast)
  // }

  toFSString () {
    return this.renderElement('this')
  }
}

module.exports = ThisExpression
