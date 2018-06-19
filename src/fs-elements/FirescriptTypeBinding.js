const FireScriptElement = require('./FireScriptElement')

/**
 * FirescriptTypeBinding
 *
 * @class FirescriptTypeBinding
 * @extends FireScriptElement
 *
 * interface FirescriptTypeBinding {
 *   type: 'FirescriptTypeBinding';
 *   name: string;
 * }
 */
class FirescriptTypeBinding extends FireScriptElement {
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

module.exports = FirescriptTypeBinding
