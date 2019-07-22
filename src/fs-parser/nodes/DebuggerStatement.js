const Node = require('./Node')

/**
 * DebuggerStatement
 *
 * @class DebuggerStatement
 * @extends FirescriptNo
 *
 * interface DebuggerStatement {
 *   type: 'DebuggerStatement';
 * }
 */
class DebuggerStatement extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('keyword', 'debugger')) {
      this.syntaxError('Unexpected token, DebuggerStatement expected')
    }

    parser.skipNext()
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'DebuggerStatement'
    })
  }
}

module.exports = DebuggerStatement
