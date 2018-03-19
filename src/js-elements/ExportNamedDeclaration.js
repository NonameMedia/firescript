const JSElement = require('./JSElement')

/**
 * ExportNamedDeclaration
 *
 * @class ExportNamedDeclaration
 * @extends JSElement
 *
 * interface ExportNamedDeclaration {
    type: 'ExportNamedDeclaration';
    declaration: ClassDeclaration | FunctionDeclaration | VariableDeclaration;
    specifiers: ExportSpecifier[];
    source: Literal;
}
*/
class ExportNamedDeclaration extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element ExportNamedDeclaration is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = ExportNamedDeclaration
