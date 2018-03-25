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

  toESString (ctx) {
    const semi = this.hasClosingSemicolon() ? ';' : ''

    return this.kind +
      ' ' +
      ctx.join(this.declarations, ', ') +
      semi
  }

  hasClosingSemicolon () {
    return !(this.parent && ['ForStatement', 'ForInStatement', 'ForOfStatement'].includes(this.parent.type))
  }
}

module.exports = VariableDeclaration
