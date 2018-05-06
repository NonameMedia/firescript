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
}

module.exports = EmptyStatement
