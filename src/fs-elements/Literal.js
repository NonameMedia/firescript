const FirescriptElement = require('./FirescriptElement')

/**
 * Literal
 *
 * @class Literal
 * @extends FirescriptElement
 *
 * interface Literal {
 *   type: 'Literal';
 *   value: boolean | number | string | RegExp | null;
 *   raw: string;
 *   regex?: { pattern: string, flags: string };
 * }
 */
class Literal extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.value = ast.value
    this.raw = ast.raw
    this.isString = /(^"[^]*"$)|(^'[^]*'$)/.test(ast.raw)
  }

  toFSString (ctx) {
    return this.renderElement(
      this.isString ? `'${this.value}'` : this.value
    )
  }

  getLineLength () {
    return this.raw.length
  }
}

module.exports = Literal
