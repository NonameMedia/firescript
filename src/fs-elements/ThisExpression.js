const FireScriptElement = require('./FireScriptElement')

/**
 * ThisExpression
 *
 * @class ThisExpression
 * @extends FireScriptElement
 *
 * interface ThisExpression {
 *   type: 'ThisExpression';
 * }
 */
class ThisExpression extends FireScriptElement {
  // constructor (ast) {
  //   super(ast)
  // }

  toFSString () {
    return this.renderElement('this')
  }
}

module.exports = ThisExpression
