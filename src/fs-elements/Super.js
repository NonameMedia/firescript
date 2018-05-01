const FireScriptElement = require('./FireScriptElement')

/**
 * Super
 *
 * @class Super
 * @extends FireScriptElement
 *
 * interface Super {
    type: 'Super';
}
*/
class Super extends FireScriptElement {
  toFSString (ctx) {
    return this.renderElement('super')
  }
}

module.exports = Super
