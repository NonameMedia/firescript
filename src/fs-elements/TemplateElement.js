const FirescriptElement = require('./FirescriptElement')

/**
 * TemplateElement
 *
 * @class TemplateElement
 * @extends FirescriptElement
 *
 * interface TemplateElement {
 *   type: 'TemplateElement';
 *   value: { cooked: string; raw: string };
 *   tail: boolean;
 * }
 */
class TemplateElement extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.value = ast.value
    this.tail = ast.tail
    this.head = false
  }

  toFSString (ctx) {
    const head = this.head ? '' : '}'
    const tail = this.tail ? '' : '${'
    return this.renderElement(
      head + this.value.raw + tail
    )
  }
}

module.exports = TemplateElement
