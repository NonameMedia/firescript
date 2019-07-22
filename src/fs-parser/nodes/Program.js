const Node = require('./Node')
const constants = require('../../utils/constants')

const ALLOWED_SCRIPT_CHILDS = [
  'BlockStatement', 'BreakStatement', 'ContinueStatement',
  'DebuggerStatement', 'DoWhileStatement', 'EmptyStatement',
  'ExpressionStatement', 'ForStatement', 'ForInStatement',
  'ForOfStatement', 'FunctionDeclaration', 'IfStatement',
  'LabeledStatement', 'ReturnStatement', 'SwitchStatement',
  'ThrowStatement', 'TryStatement', 'VariableDeclaration',
  'WhileStatement', 'WithStatement', 'ClassDeclaration',
  'FunctionDeclaration', ' VariableDeclaration',
  'FirescriptLogStatement', 'Comment'
]

const ALLOWED_MODULE_CHILDS = [
  'ImportDeclaration', 'ExportAllDeclaration', 'ExportDefaultDeclaration', 'ExportNamedDeclaration'
]

/**
 * Program node
 *
 * @class Program
 * @extends Node
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
class Program extends Node {
  constructor (parser, sourceType) {
    super(parser)

    this.isBlockScope = true
    this.sourceType = sourceType || 'module'

    this.body = []
    const comments = []

    const ALLOWED_CHILDS = this.sourceType === 'module' ? ALLOWED_SCRIPT_CHILDS.concat(ALLOWED_MODULE_CHILDS) : ALLOWED_SCRIPT_CHILDS

    while (true) {
      const nextNode = parser.nextNode(this)
      if (!nextNode) {
        break
      }

      const node = constants.EXPRESSIONS.includes(nextNode.type)
        ? parser.createNode('ExpressionStatement', nextNode)
        : nextNode

      if (node.type === 'Comment') {
        comments.push(node)
        continue
      }

      this.isAllowedNode(node, ALLOWED_CHILDS)

      if (comments.length) {
        node.leadingComments = comments.splice(0, Infinity)
      }

      this.body.push(node)

      if (parser.match('indention')) {
        parser.skipNext()
      }
    }

    if (comments.length) {
      this.body.length === 0
        ? this.innerComments = comments.splice(0, Infinity)
        : this.body[this.body.length - 1].trailingComments = comments.splice(0, Infinity)
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'Program',
      sourceType: this.sourceType,
      body: this.body.map((item) => item.resolve(ctx))
    })
  }
}

module.exports = Program
