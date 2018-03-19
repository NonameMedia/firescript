const JSElement = require('./JSElement')

/**
 * ExportAllDeclaration
 *
 * @class ExportAllDeclaration
 * @extends JSElement
 *
 * interface ExportAllDeclaration {
    type: 'ExportAllDeclaration';
    source: Literal;
}
*/
class ExportAllDeclaration extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element ExportAllDeclaration is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = ExportAllDeclaration
