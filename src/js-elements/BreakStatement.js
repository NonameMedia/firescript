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
    buffer.registerItem(this.location, 'break')
    buffer.write('break ')
    buffer.write(this.argument)
  }
}

module.exports = BreakStatement
