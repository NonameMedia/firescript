const JSElement = require('./JSElement')

/**
 * ClassDeclaration
 *
 * @class ClassDeclaration
 * @extends JSElement
 *
 * interface ClassDeclaration {
    type: 'ClassDeclaration';
    id: Identifier | null;
    superClass: Identifier | null;
    body: ClassBody;
}
*/
class ClassDeclaration extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element ClassDeclaration is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = ClassDeclaration
