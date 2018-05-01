const FireScriptElement = require('./FireScriptElement')

/**
 * LogicalExpression
 *
 * @class LogicalExpression
 * @extends FireScriptElement
 *
 * interface LogicalExpression {
    type: 'LogicalExpression';
    operator: '||' | '&&';
    left: Expression;
    right: Expression;
}
*/
class LogicalExpression extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element LogicalExpression is a DraftElement!`)
  }

  toString () {
    return this.renderElement(
      `${this.callee}(${this.arguments.join(', ')});`
    )
  }
}

module.exports = LogicalExpression
