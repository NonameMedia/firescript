const FirescriptNode = require('./FirescriptNode')

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
 * @extends FirescriptNode
 */
class TemplateElement extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('template')) {
      this.syntaxError('Unexpected token! Tempalte literal expected')
    }

    this.tail = true

    const token = tokenStack.next()
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

  toJSON () {
    return this.createJSON({
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
