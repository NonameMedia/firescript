const JSElement = require('./JSElement')

/**
 * SpreadElement
 *
 * @class SpreadElement
 * @extends JSElement
 *
 * interface SpreadElement {
 *   type: 'SpreadElement';
 *   argument: Expression;
 * }
 */
class SpreadElement extends JSElement {
  constructor (ast) {
    super(ast)

    this.argument = this.createElement(ast.argument)
  }

  compile (buffer) {
    buffer.write('...')
    buffer.write(this.argument)
  }
}

module.exports = SpreadElement
