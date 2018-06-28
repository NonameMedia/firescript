const FirescriptElement = require('./FirescriptElement')

/**
 * SpreadElement
 *
 * @class SpreadElement
 * @extends FirescriptElement
 *
 * interface SpreadElement {
 *   type: 'SpreadElement';
 *   argument: Expression;
 * }
 */
class SpreadElement extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.argument = this.createElement(ast.argument)
  }

  toFSString (ctx) {
    return this.renderElement(
      '...' +
      this.argument.toFSString(ctx)
    )
  }
}

module.exports = SpreadElement
