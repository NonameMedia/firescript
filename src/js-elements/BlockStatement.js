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
    const body = this.addComments(this.body)
    if (this.body.length === 0) {
      buffer.write('{}')
      return
    }

    buffer.write('{')
    buffer.indent(1)
    buffer.loop(body, buffer.getIndent())
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

  toESString (ctx) {
    const body = this.body.length === 0
      ? ''
      : ctx.indent(1) +
      ctx.join(this.body, ctx.indent()) +
      ctx.indent(-1)

    const innerComments = this.innerComments ? ctx.join(this.innerComments, ctx.indent()) : ''

    return this.renderElement('{' +
      innerComments +
      body +
      '}')
  }
}

module.exports = BlockStatement
