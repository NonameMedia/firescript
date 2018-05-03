const FireScriptElement = require('./FireScriptElement')

/**
 * ForStatement
 *
 * @class ForStatement
 * @extends FireScriptElement
 *
 * interface ForStatement {
 *   type: 'ForStatement';
 *   init: Expression | VariableDeclaration | null;
 *   test: Expression | null;
 *   update: Expression | null;
 *   body: Statement;
 * }
 */
class ForStatement extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.init = ast.init ? this.createElement(ast.init) : null
    this.test = ast.test ? this.createElement(ast.test) : null
    this.update = ast.update ? this.createElement(ast.update) : null
    this.body = this.createElement(ast.body)
  }

  toFSString (ctx) {
    return this.renderElement(
      'for ' +
      this.init.toFSString(ctx) +
      '; ' +
      this.test.toFSString(ctx) +
      '; ' +
      this.update.toFSString(ctx) +
      this.body.toFSString(ctx)
    )
  }
}

module.exports = ForStatement
