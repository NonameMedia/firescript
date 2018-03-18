const JSElement = require('./JSElement')

class Program extends JSElement {
  constructor (ast) {
    super(ast)

    this.body = this.createElementList(ast.body)
  }

  toString () {
    return `${this.body.join('\n')}\n`
  }
}

module.exports = Program
