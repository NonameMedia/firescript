const JSElement = require('./JSElement')

/**
 * BlockStatement
 *
 * @class BlockStatement
 * @extends JSElement
 *
 * interface BlockStatement {
    type: 'BlockStatement';
    body: StatementListItem[];
}
*/
class BlockStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element BlockStatement is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = BlockStatement
