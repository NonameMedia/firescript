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
}

module.exports = Super
