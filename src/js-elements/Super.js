const JSElement = require('./JSElement')

/**
 * Super
 *
 * @class Super
 * @extends JSElement
 *
 * interface Super {
    type: 'Super';
}
*/
class Super extends JSElement {
  toESString (ctx) {
    return this.renderElement('super')
  }

  compile (buffer) {
    buffer.registerItem(this.location, 'super')
    buffer.write('super')
  }
}

module.exports = Super
