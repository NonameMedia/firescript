const FirescriptNode = require('./FirescriptNode')

const ALLOWED_CHILDS = [
  'Identifier',
  'ArrayPattern',
  'ObjectPattern'
]

/**
 * SpreadElement
 *
 * @class SpreadElement
 * @extends FirescriptNode
 *
 * interface SpreadElement {
 *   type: 'SpreadElement';
 *   argument: Expression;
 * }
 */
class SpreadElement extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('punctuator', '...')) {
      this.syntaxError('Unexpected token! SpreadElement expected')
    }

    tokenStack.goForward()

    this.argument = this.createFullNode(tokenStack)
    this.isAllowedNode(this.argument, ALLOWED_CHILDS)
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'SpreadElement',
      argument: this.argument.toJSON(ctx)
    })
  }
}

module.exports = SpreadElement
