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
  toESString (ctx) {
    return this.renderElement('continue;')
  }

  compile (buffer) {
    buffer.registerItem(this.location, 'continue')
    buffer.write('continue ')
    buffer.write(this.argument)
  }
}

module.exports = ContinueStatement
