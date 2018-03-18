const JSElement = require('./JSElement')

class Literal extends JSElement {
  constructor (ast) {
    super(ast)

    this.raw = ast.raw
  }

  toString () {
    return this.raw
  }
}

module.exports = Literal
