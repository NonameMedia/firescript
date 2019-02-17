const JSElement = require('./JSElement')

/**
 * RestElement
 *
 * @class RestElement
 * @extends JSElement
 *
 * interface RestElement {
 *   type: 'RestElement';
 *   argument: Identifier | BindingPattern;
 * }
 */
class RestElement extends JSElement {
  constructor (ast) {
    super(ast)

    this.argument = this.createElement(ast.argument)
  }

  compile (buffer) {
    buffer.registerItem(this.location)
    buffer.write('...')
    buffer.write(this.argument)
  }

  toESString (ctx) {
    return this.renderElement(
      '...' +
      this.argument.toESString(ctx)
    )
  }
}

module.exports = RestElement
