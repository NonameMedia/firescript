const JSElement = require('./JSElement')

/**
 * BreakStatement
 *
 * @class BreakStatement
 * @extends JSElement
 *
 * interface BreakStatement {
    type: 'BreakStatement';
    label: Identifier | null;
}
*/
class BreakStatement extends JSElement {
  constructor (ast) {
    super(ast)
  }

  toESString (ctx) {
    return 'break;'
  }
}

module.exports = BreakStatement
