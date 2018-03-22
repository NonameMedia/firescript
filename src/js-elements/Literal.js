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
    this.isString = /(^"[^]*"$)|(^'[^]*'$)/.test(ast.raw)
  }

  toESString (ctx) {
    return this.isString ? `'${this.value}'` : this.value
  }
}

module.exports = Literal
