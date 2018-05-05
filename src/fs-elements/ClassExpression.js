const FireScriptElement = require('./FireScriptElement')

/**
 * ClassExpression
 *
 * @class ClassExpression
 * @extends FireScriptElement
 *
 * interface ClassExpression {
 *   type: 'ClassExpression';
 *   id: Identifier | null;
 *   superClass: Identifier | null;
 *   body: ClassBody;
 * }
 */
class ClassExpression extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.id = ast.id ? this.createElement(ast.id) : null
    this.superClass = ast.superClass ? this.createElement(ast.superClass) : null
    this.body = ast.body ? this.createElement(ast.body) : null
  }

  toFSString (ctx) {
    const superClass = this.superClass ? ' extends ' + this.superClass.toFSString(ctx) : ''

    return this.renderElement(
      'class ' +
      this.id.toFSString(ctx) +
      superClass +
      this.body.toFSString(ctx)
    )
  }
}

module.exports = ClassExpression
