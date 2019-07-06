const Node = require('./Node')

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

const WRAP_EXPRESSIONS = [
  'ThisExpression',
  'Identifier',
  'Literal',
  'ArrayExpression',
  'ObjectExpression',
  'FunctionExpression',
  'ArrowFunctionExpression',
  'ClassExpression',
  'TaggedTemplateExpression',
  'MemberExpression',
  'Super',
  'MetaProperty',
  'NewExpression',
  'CallExpression',
  'UpdateExpression',
  'AwaitExpression',
  'UnaryExpression',
  'BinaryExpression',
  'LogicalExpression',
  'ConditionalExpression',
  'YieldExpression',
  'AssignmentExpression',
  'SequenceExpression'
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

      const node = WRAP_EXPRESSIONS.includes(nextNode.type)
        ? parser.createNode('ExpressionStatement', nextNode)
        : nextNode

      if (node.type === 'comment') {
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
    console.log(this.body)
    return this.createJSON(ctx, {
      type: 'Program',
      sourceType: this.sourceType,
      body: this.body.map((item) => item.resolve(ctx))
    })
  }
}

module.exports = Program
