const FireScriptElement = require('./FireScriptElement')

/**
 * TemplateElement
 *
 * @class TemplateElement
 * @extends FireScriptElement
 *
 * interface TemplateElement {
 *   type: 'TemplateElement';
 *   value: { cooked: string; raw: string };
 *   tail: boolean;
 * }
 */
class TemplateElement extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.value = ast.value
    this.tail = ast.tail
    this.head = false
  }

  toESString (ctx) {
    const head = this.head ? '' : '}'
    const tail = this.tail ? '' : '${'
    return this.renderElement(
      head + this.value.raw + tail
    )
  }
}

module.exports = TemplateElement
