const Node = require('./Node')

/**
 * ThrowStatement
 *
 * @class ThrowStatement
 * @extends Node
 *
 * interface ThrowStatement {
 *   type: 'ThrowStatement';
 *   argument: Expression;
 * }
 */
class ThrowStatement extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('keyword "throw"')) {
      this.syntaxError('Unexpected token, throw keyword expected')
    }

    parser.skipNext()
    this.argument = parser.nextNode(this)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ThrowStatement',
      argument: this.argument.resolve(ctx)
    })
  }
}

module.exports = ThrowStatement
