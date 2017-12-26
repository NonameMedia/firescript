const FireScriptElement = require('./FireScriptElement')

class Identifier extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.name = ast.name
  }

  toString () {
    return `${this.name}`
  }
}

module.exports = Identifier
