const FirescriptElement = require('./FirescriptElement')

/**
 * LabeledStatement
 *
 * @class LabeledStatement
 * @extends FirescriptElement
 *
 * interface LabeledStatement {
    type: 'LabeledStatement';
    label: Identifier;
    body: Statement;
}
*/
class LabeledStatement extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element LabeledStatement is a DraftElement!`)
  }

  toString () {
    return this.renderElement(
      `${this.callee}(${this.arguments.join(', ')});`
    )
  }
}

module.exports = LabeledStatement
