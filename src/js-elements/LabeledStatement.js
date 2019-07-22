const JSElement = require('./JSElement')

/**
 * LabeledStatement
 *
 * @class LabeledStatement
 * @extends JSElement
 *
 * interface LabeledStatement {
    type: 'LabeledStatement';
    label: Identifier;
    body: Statement;
}
*/
class LabeledStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element LabeledStatement is a DraftElement!`)
  }

  compile (buffer) {
    buffer.registerItem(this.location, 'await')
    buffer.write(this.callee)
    buffer.loop(this.arguments, ', ')
    buffer.write(';')
  }

  toString () {
    return this.renderElement(
      `${this.callee}(${this.arguments.join(', ')});`
    )
  }
}

module.exports = LabeledStatement
