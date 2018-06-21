const FireScriptElement = require('./FireScriptElement')

/**
 * FirescriptTyping
 *
 * @class FirescriptTyping
 * @extends FireScriptElement
 *
 * interface FirescriptTyping {
 *   type: 'FirescriptTyping';
 *   name: string;
 * }
 */
class FirescriptTyping extends FireScriptElement {
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
