const FireScriptElement = require('./FireScriptElement')

class CallExpression extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.args = ast.arguments.map((item) => this.createElement(item))
  }

  toString () {
    const args = this.args.join(', ')
    return `${this.callee}(${args})`
  }
}

module.exports = CallExpression
