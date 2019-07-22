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

  compile (buffer) {
    if (this.leadingComments) {
      buffer.writeComments(this.leadingComments)
      buffer.indent()
    }

    buffer.registerItem(this.location)
    buffer.write(`${this.kind} `)
    buffer.loop(this.declarations, ', ')
    buffer.write(this.hasClosingSemicolon() ? ';' : '')

    if (this.trailingComments && this.trailingComments.length) {
      buffer.indent()
      buffer.writeComments(this.trailingComments)
    }
  }

  hasClosingSemicolon () {
    return !(this.parent && ['ForStatement', 'ForInStatement', 'ForOfStatement'].includes(this.parent.type))
  }
}

module.exports = VariableDeclaration
