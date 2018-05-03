const FireScriptElement = require('./FireScriptElement')

/**
 * SpreadElement
 *
 * @class SpreadElement
 * @extends FireScriptElement
 *
 * interface SpreadElement {
 *   type: 'SpreadElement';
 *   argument: Expression;
 * }
 */
class SpreadElement extends FireScriptElement {
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
