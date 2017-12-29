const FireScriptElement = require('./FireScriptElement')

class BlockStatement extends FireScriptElement {
  constructor (ast) {
    super(ast)
    this.indent(1)

    this.body = ast.body.map((item) => this.createElement(item))
  }

  toString () {
    const body = this.body.map((item) => item.toString()).join('\n')
    return body
  }
}

module.exports = BlockStatement
