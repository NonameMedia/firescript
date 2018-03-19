const JSElement = require('./JSElement')

/**
 * Literal
 *
 * @class Literal
 * @extends JSElement
 *
 * interface Literal {
 *   type: 'Literal';
 *   value: boolean | number | string | RegExp | null;
 *   raw: string;
 *   regex?: { pattern: string, flags: string };
 * }
 */
class Literal extends JSElement {
  constructor (ast) {
    super(ast)

    this.raw = ast.raw
  }

  toString () {
    return this.raw
  }
}

module.exports = Literal
