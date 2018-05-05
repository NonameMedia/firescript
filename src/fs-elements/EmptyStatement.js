const FireScriptElement = require('./FireScriptElement')

/**
 * EmptyStatement
 *
 * @class EmptyStatement
 * @extends FireScriptElement
 *
 * interface EmptyStatement {
    type: 'EmptyStatement';
}
*/
class EmptyStatement extends FireScriptElement {
  toFSString () {
    return ''
  }
}

module.exports = EmptyStatement
