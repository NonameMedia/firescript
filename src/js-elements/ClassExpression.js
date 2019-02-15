const JSElement = require('./JSElement')

/**
 * ClassExpression
 *
 * @class ClassExpression
 * @extends JSElement
 *
 * interface ClassExpression {
 *   type: 'ClassExpression';
 *   id: Identifier | null;
 *   superClass: Identifier | null;
 *   body: ClassBody;
 * }
 */
class ClassExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.id = ast.id ? this.createElement(ast.id) : null
    this.superClass = ast.superClass ? this.createElement(ast.superClass) : null
    this.body = ast.body ? this.createElement(ast.body) : null
  }

  compile (buffer) {
    buffer.registerItem(this.location, 'class')
    buffer.write('class ')
    this.id.compile(buffer)

    if (this.superClass) {
      buffer.write(' extends ')
      this.superClass.compile(buffer)
    }

    this.body.compile(buffer)
  }

  toESString (ctx) {
    const superClass = this.superClass ? ' extends ' + this.superClass.toESString(ctx) : ''

    return this.renderElement(
      'class ' +
      this.id.toESString(ctx) +
      superClass +
      ' ' +
      this.body.toESString(ctx)
    )
  }
}

module.exports = ClassExpression
