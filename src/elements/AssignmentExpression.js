const FireScriptElement = require('./FireScriptElement')

class AssignmentExpression extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.operator = ast.operator
    this.left = this.createElement(ast.left)
    this.right = this.createElement(ast.right)
  }

  toString () {
    return `${this.left} ${this.operator} ${this.right}`
  }
}

module.exports = AssignmentExpression
