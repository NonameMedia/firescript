const JSElement = require('./JSElement')

/**
 * TryStatement
 *
 * @class TryStatement
 * @extends JSElement
 *
 * interface TryStatement {
    type: 'TryStatement';
    block: BlockStatement;
    handler: CatchClause | null;
    finalizer: BlockStatement | null;
}
*/
class TryStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element TryStatement is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = TryStatement
