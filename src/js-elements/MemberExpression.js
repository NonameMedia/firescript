const JSElement = require('./JSElement')

/**
 * MemberExpression
 *
 * @class MemberExpression
 * @extends JSElement
 *
 * interface MemberExpression {
 *   type: 'MemberExpression';
 *   computed: boolean;
 *   object: Expression;
 *   property: Expression;
 * }
 */
class MemberExpression extends JSElement {
  constructor (ast) {
    super(ast)

    this.object = this.createElement(ast.object)
    this.property = this.createElement(ast.property)
    this.computed = ast.computed
  }

  compile (buffer) {
    if (this.computed) {
      buffer.write(this.object)
      buffer.write('[')
      buffer.write(this.property)
      buffer.write(']')
    } else {
      buffer.write(this.object)
      buffer.write('.')
      buffer.write(this.property)
    }
  }

  toESString (ctx) {
    if (this.computed) {
      return this.renderElement(
        this.object.toESString(ctx) +
        '[' +
        this.property.toESString(ctx) +
        ']'
      )
    } else {
      return this.renderElement(
        this.object.toESString(ctx) +
        '.' +
        this.property.toESString(ctx)
      )
    }
  }

  getLineLength () {
    return this.property.getLineLength() + this.object.getLineLength() + 1
  }
}

module.exports = MemberExpression
