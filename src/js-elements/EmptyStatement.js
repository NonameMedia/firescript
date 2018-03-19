const JSElement = require('./JSElement')

/**
 * EmptyStatement
 *
 * @class EmptyStatement
 * @extends JSElement
 *
 * interface EmptyStatement {
    type: 'EmptyStatement';
}
*/
class EmptyStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element EmptyStatement is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = EmptyStatement
