const FireScriptNode = require('./FireScriptNode')

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
 * @extends FireScriptNode
 */
class TemplateElement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    if (!tokenStack.expect('template')) {
      this.syntaxError('Unexpected token! Tempalte literal expected')
    }

    const token = tokenStack.next()
    this.cooked = token.value
    this.raw = token.value
      .replace(/\\/, '\\\\')
      .replace(/`/, '\\`')
    this.tail = false
  }

  toJSON () {
    return {
      type: 'TemplateElement',
      value: {
        cooked: this.cooked,
        raw: this.raw
      },
      tail: this.tail
    }
  }
}

module.exports = TemplateElement
