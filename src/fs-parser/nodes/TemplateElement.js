const Node = require('./Node')

/**
 * Tagged Template Expression
 *
 * interface TemplateElement {
 *   type: 'TemplateElement';
 *   value: { cooked: string; raw: string };
 *   tail: boolean;
 * }
 *
 * @class TemplateElement
 * @extends Node
 */
class TemplateElement extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('template')) {
      this.syntaxError('Unexpected token! Template literal expected')
    }

    this.tail = true

    const token = parser.nextToken()
    let value = token.value
    if (value.startsWith('}')) {
      value = value.slice(1)
    }

    if (value.endsWith('${')) {
      value = value.slice(0, -2)
      this.tail = false
    }

    this.cooked = value
    this.raw = value
      .replace(/\\/, '\\\\')
      .replace(/`/, '\\`')
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'TemplateElement',
      value: {
        cooked: this.cooked,
        raw: this.raw
      },
      tail: this.tail
    })
  }
}

module.exports = TemplateElement
