const FirescriptNode = require('./FirescriptNode')

const ALLOWED_SCRIPT_CHILDS = [
  'BlockStatement', 'BreakStatement', 'ContinueStatement',
  'DebuggerStatement', 'DoWhileStatement', 'EmptyStatement',
  'ExpressionStatement', 'ForStatement', 'ForInStatement',
  'ForOfStatement', 'FunctionDeclaration', 'IfStatement',
  'LabeledStatement', 'ReturnStatement', 'SwitchStatement',
  'ThrowStatement', 'TryStatement', 'VariableDeclaration',
  'WhileStatement', 'WithStatement', 'ClassDeclaration',
  'FunctionDeclaration', ' VariableDeclaration',
  'FirescriptLogStatement'
]

const ALLOWED_MODULE_CHILDS = [
  'ImportDeclaration', 'ExportAllDeclaration', 'ExportDefaultDeclaration', 'ExportNamedDeclaration'
]

/**
 * Program node
 *
 * @class Program
 * @extends FirescriptNode
 *
 * interface Program {
 *    type: 'Program';
 *    sourceType: 'script';
 *    body: StatementListItem[];
 *  }
 *
 *  interface Program {
 *    type: 'Program';
 *    sourceType: 'module';
 *    body: ModuleItem[];
 *  }
 */
class Program extends FirescriptNode {
  constructor (tokenStack, parent, sourceType) {
    super(tokenStack, parent)

    this.isBlockScope = true
    this.sourceType = sourceType || 'module'

    this.body = []
    const comments = []

    const ALLOWED_CHILDS = this.sourceType === 'module' ? ALLOWED_SCRIPT_CHILDS.concat(ALLOWED_MODULE_CHILDS) : ALLOWED_SCRIPT_CHILDS

    while (true) {
      const node = this.createFullNode(tokenStack)
      if (!node || node.type === 'Null') {
        break
      }

      if (node.type === 'Comment') {
        comments.push(node)
        continue
      }

      if (this.sourceType !== 'snippet') {
        this.isAllowedNode(node, ALLOWED_CHILDS, tokenStack.current())
      }

      if (comments.length) {
        node.leadingComments = comments.splice(0, Infinity)
      }

      this.body.push(node)

      if (tokenStack.expect('indention')) {
        tokenStack.goForward()
      }
    }

    if (comments.length) {
      this.body.length === 0
        ? this.innerComments = comments.splice(0, Infinity)
        : this.body[this.body.length - 1].trailingComments = comments.splice(0, Infinity)
    }

    this.tearDown()
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'Program',
      sourceType: this.sourceType,
      body: this.body.map((item) => item.toJSON(ctx))
    })
  }
}

module.exports = Program
