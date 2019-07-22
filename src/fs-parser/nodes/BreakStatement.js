const Node = require('./Node')

/**
 * BreakStatement
 *
 * @class BreakStatement
 * @extends Node
 *
 * interface BreakStatement {
 *   type: 'BreakStatement';
 *   label: Identifier | null;
 * }
 */
class BreakStatement extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('keyword "break"')) {
      this.syntaxError('Unexpected token, BreakStatement expected')
    }

    parser.skipNext()

    if (parser.match('identifier')) {
      this.lable = parser.nextNode(this)
    } else {
      this.label = null
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'BreakStatement',
      label: this.label ? this.label.resolve(ctx) : null
    })
  }
}

module.exports = BreakStatement
