const JSElement = require('./JSElement')

/**
 * ForStatement
 *
 * @class ForStatement
 * @extends JSElement
 *
 * interface ForStatement {
 *   type: 'ForStatement';
 *   init: Expression | VariableDeclaration | null;
 *   test: Expression | null;
 *   update: Expression | null;
 *   body: Statement;
 * }
 */
class ForStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.init = ast.init ? this.createElement(ast.init) : null
    this.test = ast.test ? this.createElement(ast.test) : null
    this.update = ast.update ? this.createElement(ast.update) : null
    this.body = this.createElement(ast.body)
  }

  compile (buffer) {
    buffer.registerItem(this.location, 'for')
    buffer.write('for (')
    buffer.write(this.init)
    buffer.write('; ')
    buffer.write(this.test)
    buffer.write('; ')
    buffer.write(this.update)
    buffer.write(') ')
    buffer.write(this.body)
  }

  toESString (ctx) {
    return this.renderElement(
      'for (' +
      this.init.toESString(ctx) +
      '; ' +
      this.test.toESString(ctx) +
      '; ' +
      this.update.toESString(ctx) +
      ') ' +
      this.body.toESString(ctx)
    )
  }
}

module.exports = ForStatement
