const JSElement = require('./JSElement')

/**
 * TemplateElement
 *
 * @class TemplateElement
 * @extends JSElement
 *
 * interface TemplateElement {
 *   type: 'TemplateElement';
 *   value: { cooked: string; raw: string };
 *   tail: boolean;
 * }
 */
class TemplateElement extends JSElement {
  constructor (ast) {
    super(ast)

    this.value = ast.value
    this.tail = ast.tail
    this.head = false
  }

  compile (buffer) {
    buffer.registerItem(this.location)
    buffer.write(this.head ? '' : '}')
    buffer.write(this.value.raw)
    buffer.write(this.tail ? '' : '${')
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
