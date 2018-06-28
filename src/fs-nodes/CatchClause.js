const FirescriptNode = require('./FirescriptNode')

const ALLOWED_PARAMS = [
  'Identifier',
  'ArrayPattern',
  'ObjectPattern'
]

/**
 * CatchClause
 *
 * @class CatchClause
 * @extends FirescriptNode
 *
 * interface CatchClause {
 *   type: 'CatchClause';
 *   param: Identifier | BindingPattern;
 *   body: BlockStatement;
 * }
 */
class CatchClause extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('keyword', 'catch')) {
      this.syntaxError('Unexpected token, catch keyword expected', tokenStack)
    }

    tokenStack.goForward()
    this.param = this.createFullNode(tokenStack)
    this.isAllowedNode(this.param, ALLOWED_PARAMS)
    this.body = this.createBlockStatementNode(tokenStack)
  }

  toJSON () {
    return this.createJSON({
      type: 'CatchClause',
      body: this.body.toJSON(),
      param: this.param.toJSON()
    })
  }
}

module.exports = CatchClause
