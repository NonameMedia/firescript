const JSElement = require('./JSElement')

class Identifier extends JSElement {
  constructor (ast) {
    super(ast)

    this.name = ast.name
  }

  toString () {
    return this.name
  }
}

module.exports = Identifier
