const FireScriptElement = require('./FireScriptElement')

/**
 * VariableDeclarator
 *
 * @class VariableDeclarator
 * @extends FireScriptElement
 *
 * interface VariableDeclarator {
 *   type: 'VariableDeclarator';
 *   id: Identifier | BindingPattern;
 *   init: Expression | null;
 * }
*/
class VariableDeclarator extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.id = this.createElement(ast.id)
    this.init = ast.init ? this.createElement(ast.init) : null
  }

  toFSString (ctx) {
    if (!this.init) {
      return this.renderElement(
        this.id.toFSString(ctx)
      )
    }

    const init = this.init.toFSString(ctx)
    const initSpacing = init.startsWith('\n') ? '' : ' '

    return this.renderElement(
      this.id.toFSString(ctx) +
      ' =' +
      initSpacing +
      init
    )
  }
}

module.exports = VariableDeclarator
