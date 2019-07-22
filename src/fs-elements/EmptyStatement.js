const FirescriptElement = require('./FirescriptElement')

/**
 * EmptyStatement
 *
 * @class EmptyStatement
 * @extends FirescriptElement
 *
 * interface EmptyStatement {
    type: 'EmptyStatement';
}
*/
class EmptyStatement extends FirescriptElement {
  toFSString () {
    return ''
  }
}

module.exports = EmptyStatement
