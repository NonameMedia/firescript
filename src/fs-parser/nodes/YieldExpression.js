const Node = require('./Node')

/**
 * YieldExpression
 *
 * @class YieldExpression
 * @extends Node
 *
 * interface YieldExpression {
 *   type: 'YieldExpression';
 *   argument: Expression | null;
 *   delegate: boolean;
 * }
 */
class YieldExpression extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('keyword "yield"')) {
      parser.syntaxError('Unexpected token, yield keyword expected')
    }

    parser.skipNext()
    this.delegate = false
    if (parser.match('operator "*"')) {
      this.delegate = true
      parser.skipNext()
    }

    this.argument = parser.nextNode(this)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'YieldExpression',
      argument: this.argument.resolve(ctx),
      delegate: this.delegate
    })
  }
}

module.exports = YieldExpression
