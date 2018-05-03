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

  toFSString (ctx) {
    return this.renderElement(
      'catch ' +
      this.param.toFSString(ctx) +
      this.body.toFSString(ctx)
    )
  }
}

module.exports = CatchClause
