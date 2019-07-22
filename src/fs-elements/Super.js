const FirescriptElement = require('./FirescriptElement')

/**
 * Super
 *
 * @class Super
 * @extends FirescriptElement
 *
 * interface Super {
    type: 'Super';
}
*/
class Super extends FirescriptElement {
  toFSString (ctx) {
    return this.renderElement('super')
  }
}

module.exports = Super
