const FireScriptElement = require('./FireScriptElement')

/**
 * VariableDeclaration
 *
 * @class VariableDeclaration
 * @extends FireScriptElement
 *
 * interface VariableDeclaration {
 *   type: 'VariableDeclaration';
 *   declarations: VariableDeclarator[];
 *   kind: 'var' | 'const' | 'let';
 * }
 */
class VariableDeclaration extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.kind = ast.kind
    this.declarations = this.createElementList(ast.declarations)
  }

  isKindRequired () {
    return !this.isParent(['ForInStatement', 'ForOfStatement'])
  }

  toFSString (ctx) {
    const kind = this.isKindRequired() ? this.kind + ' ' : ''

    return this.declarations.map((declaration) => {
      return this.renderElement(
        kind +
        declaration.toFSString(ctx)
      )
    }).join(ctx.indent())
  }
}

module.exports = VariableDeclaration
