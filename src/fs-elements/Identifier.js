const FirescriptElement = require('./FirescriptElement')

/**
 * Identifier
 *
 * @class Identifier
 * @extends FirescriptElement
 *
 * interface Identifier {
 *   type: 'Identifier';
 *   name: string;
 * }
 */
class Identifier extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.name = ast.name
  }

  toFSString (ctx) {
    return this.renderElement(this.name)
  }

  getLength () {
    return this.name.length
  }
}

module.exports = Identifier
