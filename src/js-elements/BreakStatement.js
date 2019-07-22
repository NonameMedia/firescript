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

  compile (buffer) {
    buffer.registerItem(this.location)
    buffer.write('break')
    if (this.label) {
      buffer.write(' ')
      buffer.write(this.label)
    }

    buffer.write(';')
  }
}

module.exports = BreakStatement
