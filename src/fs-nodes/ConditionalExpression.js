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

    if (!tokenStack.expect('punctuator', '?')) {
      this.syntaxError('Unexpected token! ? punctuator expected', tokenStack.current())
    }

    tokenStack.goForward()
    this.consequent = this.createFullNode(tokenStack)

    if (!tokenStack.expect('punctuator', ':')) {
      this.syntaxError('Unexpected token! : punctuator expected', tokenStack.current())
    }

    tokenStack.goForward()
    this.alternate = this.createFullNode(tokenStack)
  }

  toJSON () {
    return this.createJSON({
      type: 'ConditionalExpression',
      test: this.test.toJSON(),
      consequent: this.consequent.toJSON(),
      alternate: this.alternate ? this.alternate.toJSON() : null
    })
  }
}

module.exports = ConditionalExpression
