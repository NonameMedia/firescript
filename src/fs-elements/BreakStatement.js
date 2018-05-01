const FireScriptElement = require('./FireScriptElement')

/**
 * BreakStatement
 *
 * @class BreakStatement
 * @extends FireScriptElement
 *
 * interface BreakStatement {
    type: 'BreakStatement';
    label: Identifier | null;
}
*/
class BreakStatement extends FireScriptElement {
  toFSString (ctx) {
    return this.renderElement('break')
  }
}

module.exports = BreakStatement
