const JSElement = require('./JSElement')

/**
 * ClassDeclaration
 *
 * @class ClassDeclaration
 * @extends JSElement
 *
 * interface ClassDeclaration {
 *   type: 'ClassDeclaration';
 *   id: Identifier | null;
 *   superClass: Identifier | null;
 *   body: ClassBody;
 * }
 */
class ClassDeclaration extends JSElement {
  constructor (ast) {
    super(ast)

    this.id = ast.id ? this.createElement(ast.id) : null
    this.superClass = ast.superClass ? this.createElement(ast.superClass) : null
    this.body = ast.body ? this.createElement(ast.body) : null
  }

  toESString (ctx) {
    const superClass = this.superClass ? ' extends ' + this.superClass.toESString(ctx) : ''

    const item = ctx.registerItem(this)
    const str = this.renderElement(
      'class ' +
      this.id.toESString(ctx) +
      superClass +
      ' ' +
      this.body.toESString(ctx)
    )

    item.setLen(str.length)
    return str
  }
}

module.exports = ClassDeclaration
