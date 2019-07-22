const Node = require('./Node')

/**
 * TryStatement
 *
 * @class TryStatement
 * @extends Node
 *
 * interface TryStatement {
 *     type: 'TryStatement';
 *     block: BlockStatement;
 *     handler: CatchClause | null;
 *     finalizer: BlockStatement | null;
 * }
 */
class TryStatement extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('keyword "try"')) {
      this.syntaxError('Unexpected token, try keyword expected')
    }

    parser.skipNext()
    this.block = parser.createNode('BlockStatement')
    parser.skipNext()
    this.handler = parser.createNode('CatchClause')
    if (parser.match('keyword "finally"')) {
      parser.skipNext()
      this.handler = parser.createNode('BlockStatement')
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'TryStatement',
      block: this.block.resolve(ctx),
      handler: this.handler ? this.handler.resolve(ctx) : null,
      finalizer: this.finalizer ? this.finalizer.resolve(ctx) : null
    })
  }
}

module.exports = TryStatement
