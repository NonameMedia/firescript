const FireScriptElement = require('./FireScriptElement')

class Literal extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.value = ast.value
  }

  toString () {
    return `'${this.value}'`
  }
}

module.exports = Literal
