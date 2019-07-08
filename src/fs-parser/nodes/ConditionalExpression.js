const Node = require('./Node')

/**
 * ConditionalExpression
 *
 * @class ConditionalExpression
 * @extends Node
 *
 * interface ConditionalExpression {
 *   type: 'ConditionalExpression';
 *   test: Expression;
 *   consequent: Statement;
 *   alternate?: Statement;
 * }
 */
class ConditionalExpression extends Node {
  constructor (parser, test) {
    super(parser)

    this.test = test || parser.nextNode(this)

    if (parser.match('indention')) {
      parser.skipNext()
    }

    if (!parser.match('punctuator', '?')) {
      this.syntaxError('Unexpected token! ? punctuator expected')
    }

    parser.skipNext()
    this.consequent = parser.nextNode(this)

    if (parser.match('indention')) {
      parser.skipNext()
    }

    if (!parser.match('punctuator', ':')) {
      this.syntaxError('Unexpected token! : punctuator expected')
    }

    parser.skipNext()
    this.alternate = parser.nextNode(this)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ConditionalExpression',
      test: this.test.resolve(ctx),
      consequent: this.consequent.resolve(ctx),
      alternate: this.alternate ? this.alternate.resolve(ctx) : null
    })
  }
}

module.exports = ConditionalExpression
