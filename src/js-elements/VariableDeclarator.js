const JSElement = require('./JSElement')

/**
 * VariableDeclarator
 *
 * @class VariableDeclarator
 * @extends JSElement
 *
 * interface VariableDeclarator {
 *   type: 'VariableDeclarator';
 *   id: Identifier | BindingPattern;
 *   init: Expression | null;
 * }
*/
class VariableDeclarator extends JSElement {
  constructor (ast) {
    super(ast)

    this.id = this.createElement(ast.id)
    this.init = ast.init ? this.createElement(ast.init) : null
  }

  toESString (ctx) {
    if (!this.init) {
      return this.renderElement(
        this.id.toESString(ctx)
      )
    }

    return this.renderElement(
      this.id.toESString(ctx) +
      ' = ' +
      this.init.toESString(ctx)
    )
  }
}

module.exports = VariableDeclarator
