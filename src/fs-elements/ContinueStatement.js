const FirescriptElement = require('./FirescriptElement')

/**
 * ContinueStatement
 *
 * @class ContinueStatement
 * @extends FirescriptElement
 *
 * interface ContinueStatement {
 *   type: 'ContinueStatement';
 *   label: Identifier | null;
 * }
 */
class ContinueStatement extends FirescriptElement {
  toFSString (ctx) {
    return this.renderElement('continue')
  }
}

module.exports = ContinueStatement
