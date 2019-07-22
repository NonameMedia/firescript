const FirescriptElement = require('./FirescriptElement')

/**
 * BreakStatement
 *
 * @class BreakStatement
 * @extends FirescriptElement
 *
 * interface BreakStatement {
    type: 'BreakStatement';
    label: Identifier | null;
}
*/
class BreakStatement extends FirescriptElement {
  toFSString (ctx) {
    return this.renderElement('break')
  }
}

module.exports = BreakStatement
