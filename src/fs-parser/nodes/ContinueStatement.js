const Node = require('./Node')

/**
 * ContinueStatement
 *
 * @class ContinueStatement
 * @extends Node
 *
 * interface ContinueStatement {
 *   type: 'ContinueStatement';
 *   label: Identifier | null;
 * }
 */
class ContinueStatement extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('keyword "continue"')) {
      this.syntaxError('Unexpected token, ContinueStatement expected')
    }

    parser.skipNext()

    if (parser.match('identifier')) {
      this.lable = parser.createNode('Identifier')
    } else {
      this.label = null
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ContinueStatement',
      label: this.label ? this.label.resolve(ctx) : null
    })
  }
}

module.exports = ContinueStatement
