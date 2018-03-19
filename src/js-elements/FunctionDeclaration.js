const JSElement = require('./JSElement')

/**
 * FunctionDeclaration
 *
 * @class FunctionDeclaration
 * @extends JSElement
 *
 * interface FunctionDeclaration {
    type: 'FunctionDeclaration';
    id: Identifier | null;
    params: FunctionParameter[];
    body: BlockStatement;
    generator: boolean;
    async: boolean;
    expression: false;
}
*/
class FunctionDeclaration extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element FunctionDeclaration is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = FunctionDeclaration
