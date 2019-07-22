const JSElement = require('./JSElement')

/**
 * EmptyStatement
 *
 * @class EmptyStatement
 * @extends JSElement
 *
 * interface EmptyStatement {
    type: 'EmptyStatement';
}
*/
class EmptyStatement extends JSElement {
  compile (buffer) {
    // do nothing
  }
}

module.exports = EmptyStatement
