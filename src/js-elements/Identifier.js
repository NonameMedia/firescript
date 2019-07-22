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

  compile (buffer) {
    buffer.registerItem(this.location)
    buffer.write(this.name)
  }

  toESString (ctx) {
    return this.renderElement(this.name)
  }

  getLineLength () {
    return this.name.length
  }
}

module.exports = Identifier
