const FireScriptElement = require('./FireScriptElement')

/**
 * CatchClause
 *
 * @class CatchClause
 * @extends FireScriptElement
 *
 * interface CatchClause {
 *   type: 'CatchClause';
 *   param: Identifier | BindingPattern;
 *   body: BlockStatement;
 * }
 */
class CatchClause extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.param = this.createElement(ast.param)
    this.body = this.createElement(ast.body)
  }

  toESString (ctx) {
    return this.renderElement(
      'catch (' +
      this.param.toESString(ctx) +
      ') ' +
      this.body.toESString(ctx)
    )
  }
}

module.exports = CatchClause
