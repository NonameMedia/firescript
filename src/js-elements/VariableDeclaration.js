const JSElement = require('./JSElement')

/**
 * VariableDeclaration
 *
 * @class VariableDeclaration
 * @extends JSElement
 *
 * interface VariableDeclaration {
 *   type: 'VariableDeclaration';
 *   declarations: VariableDeclarator[];
 *   kind: 'var' | 'const' | 'let';
 * }
 */
class VariableDeclaration extends JSElement {
  constructor (ast) {
    super(ast)

    this.kind = ast.kind
    this.declarations = this.createElementList(ast.declarations)
  }

  toString () {
    return `${this.kind} ${this.declarations.join(', ')};`
  }
}

module.exports = VariableDeclaration
