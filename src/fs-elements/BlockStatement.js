const FireScriptElement = require('./FireScriptElement')

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
 * @extends FireScriptElement
 *
 * interface BlockStatement {
 *   type: 'BlockStatement';
 *   body: StatementListItem[];
 * }
*/
class BlockStatement extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.body = this.createElementList(ast.body, ALLOWED_CHILDS)
  }

  toFSString (ctx) {
    return this.renderElement(
      ctx.indent(1) +
      ctx.join(this.body, ctx.indent()) +
      ctx.indent(-1)
    )
  }
}

module.exports = BlockStatement
