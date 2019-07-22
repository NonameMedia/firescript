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
    buffer.write(this.head ? '' : '}')
    buffer.write(this.value.raw)
    buffer.write(this.tail ? '' : '${')
  }
}

module.exports = TemplateElement
