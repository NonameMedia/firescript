const JSElement = require('./JSElement')

const ALLOWED_CHILDS = [
  'ClassDeclaration', 'FunctionDeclaration', ' VariableDeclaration',
  'BlockStatement', 'BreakStatement', 'ContinueStatement',
  'DebuggerStatement', 'DoWhileStatement', 'EmptyStatement',
  'ExpressionStatement', 'ForStatement', 'ForInStatement',
  'ForOfStatement', 'FunctionDeclaration', 'IfStatement',
  'LabeledStatement', 'ReturnStatement', 'SwitchStatement',
  'ThrowStatement', 'TryStatement', 'VariableDeclaration',
  'WhileStatement', 'WithStatement'
]

/**
 * BlockStatement
 *
 * @class BlockStatement
 * @extends JSElement
 *
 * interface BlockStatement {
 *   type: 'BlockStatement';
 *   body: StatementListItem[];
 * }
*/
class BlockStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.body = this.createElementList(ast.body, ALLOWED_CHILDS)
  }

  compile (buffer) {
    const body = this.body
    if (this.body.length === 0) {
      buffer.write('{')
      if (this.innerComments && this.innerComments.length) {
        buffer.indent(1, true)
        for (const comment of this.innerComments) {
          buffer.indent()
          buffer.write(comment)
        }
        // buffer.writeComments(this.innerComments)
        buffer.indent(-1)
      }
      buffer.write('}')
      buffer.writeComments(this.trailingComments)
      return
    }

    buffer.write('{')
    buffer.indent(1, true)
    for (const item of body) {
      buffer.indent()
      buffer.writeComments(item.leadingComments)
      buffer.writeComments(item.innerComments)
      buffer.write(item)
      buffer.writeComments(item.trailingComments)
    }
    // buffer.loop(body, buffer.getIndent())
    buffer.indent(-1)
    buffer.write('}')
  }

  addEmptyLine (item, next) {
    if (!next) {
      return false
    }

    return (
      item.type === 'ClassDeclaration' && next
    )
  }
}

module.exports = BlockStatement
