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

    this.value = ast.value
    this.raw = ast.raw
    this.isString = /(^"[^]*"$)|(^'[^]*'$)/.test(ast.raw)
  }

  toESString (ctx) {
    return this.isString ? `'${this.value}'` : this.value
  }

  getLength () {
    return this.raw.length
  }
}

module.exports = Literal
