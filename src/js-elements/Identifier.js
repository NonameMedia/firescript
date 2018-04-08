const JSElement = require('./JSElement')

/**
 * Identifier
 *
 * @class Identifier
 * @extends JSElement
 *
 * interface Identifier {
 *   type: 'Identifier';
 *   name: string;
 * }
 */
class Identifier extends JSElement {
  constructor (ast) {
    super(ast)

    this.name = ast.name
  }

  toESString (ctx) {
    return this.renderElement(this.name)
  }
}

module.exports = Identifier
