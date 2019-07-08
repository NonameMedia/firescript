const Node = require('./Node')

/**
 * YieldExpression
 *
 * @class YieldExpression
 * @extends FirescriptNode
 *
 * interface YieldExpression {
 *   type: 'YieldExpression';
 *   argument: Expression | null;
 *   delegate: boolean;
 * }
 */
class YieldExpression extends FirescriptNode {
  constructor (parser) {
    super(parser)

    if (!tokenStack.expect('keyword', 'yield')) {
      this.syntaxError('Unexpected token, yield keyword expected', tokenStack)
    }

    parser.skipNext()
    this.delegate = false
    if (tokenStack.expect('operator', '*')) {
      this.delegate = true
      parser.skipNext()
    }

    this.argument = parser.nextNode(this)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'YieldExpression',
      argument: this.argument.toJSON(ctx),
      delegate: this.delegate
    })
  }
}

module.exports = YieldExpression
