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
  compile (buffer) {
    buffer.registerItem(this.location, 'continue')
    buffer.write('continue')
    if (this.label) {
      buffer.write(' ')
      buffer.write(this.label)
    }

    buffer.write(';')
  }
}

module.exports = ContinueStatement
