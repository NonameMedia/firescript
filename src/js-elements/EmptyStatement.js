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
  toESString () {
    return this.renderElement(
      ''
    )
  }

  compile (buffer) {
    // do nothing
  }
}

module.exports = EmptyStatement
