const FirescriptNode = require('./FirescriptNode')

/**
 * ConditionalExpression
 *
 * @class ConditionalExpression
 * @extends FirescriptNode
 *
 * interface ConditionalExpression {
 *   type: 'ConditionalExpression';
 *   test: Expression;
 *   consequent: Statement;
 *   alternate?: Statement;
 * }
 */
class ConditionalExpression extends FirescriptNode {
  constructor (tokenStack, parent, test) {
    super(tokenStack, parent)

    this.test = test || this.createFullNode(tokenStack)

    tokenStack.print('CONDEXP')

    if (tokenStack.expect('indention')) {
      tokenStack.goForward()
    }

    if (!tokenStack.expect('punctuator', '?')) {
      this.syntaxError('Unexpected token! ? punctuator expected', tokenStack.current())
    }

    tokenStack.goForward()
    this.consequent = this.createFullNode(tokenStack)

    if (tokenStack.expect('indention')) {
      tokenStack.goForward()
    }

    if (!tokenStack.expect('punctuator', ':')) {
      this.syntaxError('Unexpected token! : punctuator expected', tokenStack.current())
    }

    tokenStack.goForward()
    this.alternate = this.createFullNode(tokenStack)
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'ConditionalExpression',
      test: this.test.toJSON(ctx),
      consequent: this.consequent.toJSON(ctx),
      alternate: this.alternate ? this.alternate.toJSON(ctx) : null
    })
  }
}

module.exports = ConditionalExpression
