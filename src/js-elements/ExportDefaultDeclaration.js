const JSElement = require('./JSElement')

/**
 * ExportDefaultDeclaration
 *
 * @class ExportDefaultDeclaration
 * @extends JSElement
 *
 * interface ExportDefaultDeclaration {
    type: 'ExportDefaultDeclaration';
    declaration: Identifier | BindingPattern | ClassDeclaration | Expression | FunctionDeclaration;
}
*/
class ExportDefaultDeclaration extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element ExportDefaultDeclaration is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = ExportDefaultDeclaration
