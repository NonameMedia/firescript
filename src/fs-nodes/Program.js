const FireScriptNode = require('./FireScriptNode')

const ALLOWED_SCRIPT_CHILDS = [
  'BlockStatement', 'BreakStatement', 'ContinueStatement',
  'DebuggerStatement', 'DoWhileStatement', 'EmptyStatement',
  'ExpressionStatement', 'ForStatement', 'ForInStatement',
  'ForOfStatement', 'FunctionDeclaration', 'IfStatement',
  'LabeledStatement', 'ReturnStatement', 'SwitchStatement',
  'ThrowStatement', 'TryStatement', 'VariableDeclaration',
  'WhileStatement', 'WithStatement', 'ClassDeclaration',
  'FunctionDeclaration', ' VariableDeclaration'
]

const ALLOWED_MODULE_CHILDS = [
  'ImportDeclaration', 'ExportAllDeclaration', 'ExportDefaultDeclaration', 'ExportNamedDeclaration'
]

/**
 * Program node
 *
 * @class Program
 * @extends FireScriptNode
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
class Program extends FireScriptNode {
  constructor (tokenStack, parent, sourceType) {
    super(tokenStack, parent)

    this.isBlockScope = true
    this.sourceType = sourceType || 'module'
    this.body = []

    const ALLOWED_CHILDS = this.sourceType === 'module' ? ALLOWED_SCRIPT_CHILDS.concat(ALLOWED_MODULE_CHILDS) : ALLOWED_SCRIPT_CHILDS

    while (true) {
      const node = this.createFullNode(tokenStack)
      if (!node || node.type === 'Null') {
        break
      }

      this.isAllowedNode(node, ALLOWED_CHILDS, tokenStack.current())
      this.body.push(node)

      if (tokenStack.expect('indention')) {
        tokenStack.goForward()
      }
    }
  }

  toJSON () {
    return this.createJSON({
      type: 'Program',
      sourceType: this.sourceType,
      body: this.body.map((item) => item.toJSON())
    })
  }
}

module.exports = Program
