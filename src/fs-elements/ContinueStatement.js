const FireScriptElement = require('./FireScriptElement')

/**
 * ContinueStatement
 *
 * @class ContinueStatement
 * @extends FireScriptElement
 *
 * interface ContinueStatement {
 *   type: 'ContinueStatement';
 *   label: Identifier | null;
 * }
 */
class ContinueStatement extends FireScriptElement {
  toFSString (ctx) {
    return this.renderElement('continue')
  }
}

module.exports = ContinueStatement
