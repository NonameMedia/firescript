const FirescriptElement = require('./FirescriptElement')

/**
 * FirescriptTyping
 *
 * @class FirescriptTyping
 * @extends FirescriptElement
 *
 * interface FirescriptTyping {
 *   type: 'FirescriptTyping';
 *   name: string;
 * }
 */
class FirescriptTyping extends FirescriptElement {
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

module.exports = FirescriptTyping
