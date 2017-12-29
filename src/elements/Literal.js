const FireScriptElement = require('./FireScriptElement')

class Literal extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.value = ast.value
  }

  toString () {
    if (typeof this.value === 'string') {
      return `'${this.value}'`
    }

    return `${this.value}`
  }
}

module.exports = Literal
