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
  toESString (ctx) {
    return this.renderElement('break;')
  }
}

module.exports = BreakStatement
