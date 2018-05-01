const FireScriptElement = require('./FireScriptElement')

/**
 * LabeledStatement
 *
 * @class LabeledStatement
 * @extends FireScriptElement
 *
 * interface LabeledStatement {
    type: 'LabeledStatement';
    label: Identifier;
    body: Statement;
}
*/
class LabeledStatement extends FireScriptElement {
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
