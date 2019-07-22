const JSElement = require('./JSElement')

/**
 * ClassBody
 *
 * @class ClassBody
 * @extends JSElement
 *
 * interface ClassBody {
 *   type: 'ClassBody';
 *   body: MethodDefinition[];
 * }
 */
class ClassBody extends JSElement {
  constructor (ast) {
    super(ast)

    this.body = this.createElementList(ast.body)
  }

  compile (buffer) {
    if (this.body.length === 0) {
      buffer.write('{}')
      return
    }

    buffer.write('{')
    buffer.indent(1)
    this.body.forEach((item, index) => {
      if (index) {
        buffer.indent()
      }

      item.compile(buffer)

      if (this.addEmptyLine(item, this.body[index + 1])) {
        buffer.nl()
      }
    })

    buffer.indent(-1)
    buffer.write('}')
  }

  addEmptyLine (item, next) {
    if (!next) {
      return false
    }

    return (
      item.type === 'MethodDefinition' && next
    )
  }
}

module.exports = ClassBody
