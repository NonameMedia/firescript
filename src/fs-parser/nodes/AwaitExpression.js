const Node = require('./Node')

/**
 * AwaitExpression
 *
 * @class AwaitExpression
 * @extends Node
 *
 * interface AwaitExpression {
 *   type: 'AwaitExpression';
 *   argument: Expression | null;
 * }
 */
class AwaitExpression extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('keyword "await"')) {
      parser.syntaxError('Unexpected token, await keyword expected')
    }

    parser.skipNext()
    this.argument = parser.nextNode(this)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'AwaitExpression',
      argument: this.argument.resolve(ctx)
    })
  }
}

module.exports = AwaitExpression
