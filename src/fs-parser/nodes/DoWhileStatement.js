const Node = require('./Node')

/**
 * DoWhileStatement
 *
 * @class DoWhileStatement
 * @extends Node
 *
 * interface DoWhileStatement {
 *   type: 'DoWhileStatement';
 *   body: Statement;
 *   test: Expression;
 * }
 */
class DoWhileStatement extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('keyword', 'do')) {
      this.syntaxError('Unexpected token! do keyword expected')
    }

    parser.skipNext()
    this.body = parser.createNode('BlockStatement')

    if (parser.match('indention')) {
      parser.skipNext()
    }

    if (!parser.match('keyword', 'while')) {
      this.syntaxError('Unexpected token! while keyword expected')
    }

    parser.skipNext()
    this.test = parser.nextNode(this)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'DoWhileStatement',
      test: this.test.resolve(ctx),
      body: this.body.resolve(ctx)
    })
  }
}

module.exports = DoWhileStatement
