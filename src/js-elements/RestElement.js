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

  toESString (ctx) {
    return '...' +
      this.argument.toESString(ctx)
  }
}

module.exports = RestElement
