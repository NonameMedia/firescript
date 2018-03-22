const JSElement = require('./JSElement')

/**
 * ContinueStatement
 *
 * @class ContinueStatement
 * @extends JSElement
 *
 * interface ContinueStatement {
 *   type: 'ContinueStatement';
 *   label: Identifier | null;
 * }
 */
class ContinueStatement extends JSElement {
  constructor (ast) {
    super(ast)
  }

  toESString (ctx) {
    return 'continue;'
  }
}

module.exports = ContinueStatement
