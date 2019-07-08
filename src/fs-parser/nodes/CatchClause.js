const Node = require('./Node')

const ALLOWED_PARAMS = [
  'Identifier',
  'ArrayPattern',
  'ObjectPattern'
]

/**
 * CatchClause
 *
 * @class CatchClause
 * @extends Node
 *
 * interface CatchClause {
 *   type: 'CatchClause';
 *   param: Identifier | BindingPattern;
 *   body: BlockStatement;
 * }
 */
class CatchClause extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('keyword "catch"')) {
      this.syntaxError('Unexpected token, catch keyword expected')
    }

    parser.skipNext()
    this.param = parser.nextNode(this)
    this.isAllowedNode(this.param, ALLOWED_PARAMS)
    this.body = parser.createNode('BlockStatement')
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'CatchClause',
      body: this.body.resolve(ctx),
      param: this.param.resolve(ctx)
    })
  }
}

module.exports = CatchClause
