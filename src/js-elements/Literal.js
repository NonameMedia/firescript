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

  compile (buffer) {
    buffer.registerItem(this.location)
    buffer.write(this.isString ? `'${this.value}'` : this.raw)
  }

  getLineLength () {
    return this.raw.length
  }
}

module.exports = Literal
