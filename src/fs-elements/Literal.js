const FireScriptElement = require('./FireScriptElement')

/**
 * Literal
 *
 * @class Literal
 * @extends FireScriptElement
 *
 * interface Literal {
 *   type: 'Literal';
 *   value: boolean | number | string | RegExp | null;
 *   raw: string;
 *   regex?: { pattern: string, flags: string };
 * }
 */
class Literal extends FireScriptElement {
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

  getLength () {
    return this.raw.length
  }
}

module.exports = Literal
