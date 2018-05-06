const FireScriptElement = require('./FireScriptElement')

/**
 * Identifier
 *
 * @class Identifier
 * @extends FireScriptElement
 *
 * interface Identifier {
 *   type: 'Identifier';
 *   name: string;
 * }
 */
class Identifier extends FireScriptElement {
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
