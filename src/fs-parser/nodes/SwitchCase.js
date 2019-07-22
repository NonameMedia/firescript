const Node = require('./Node')
const constants = require('../../utils/constants')

const ALLOWED_TEST_EXPRESSIONS = [
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

const ALLOWED_CHILDS = [
  'BlockStatement',
  'BreakStatement',
  'ContinueStatement',
  'DebuggerStatement',
  'DoWhileStatement',
  'EmptyStatement',
  'ExpressionStatement',
  'ForStatement',
  'ForInStatement',
  'ForOfStatement',
  'FunctionDeclaration',
  'IfStatement',
  'LabeledStatement',
  'ReturnStatement',
  'SwitchStatement',
  'ThrowStatement',
  'TryStatement',
  'VariableDeclaration',
  'WhileStatement',
  'WithStatement',
  'FirescriptLogStatement'
]
/**
 * SwitchCase
 *
 * @class SwitchCase
 * @extends Node
 *
 * interface SwitchStatement {
 *   type: 'SwitchStatement';
 *   discriminant: Expression;
 *   cases: SwitchCase[];
 * }
 */
class SwitchCase extends Node {
  constructor (parser) {
    super(parser)
    this.isBlockScope = true

    if (!parser.match('keyword [case,default]')) {
      this.syntaxError('Unexpected token, case or default identifier expected!')
    }

    if (parser.match('keyword "case"')) {
      parser.skipNext()
      this.test = parser.nextNode(this)
      this.isAllowedNode(this.test, ALLOWED_TEST_EXPRESSIONS)
    } else if (parser.match('keyword "default"')) {
      parser.skipNext()
      this.test = null
    }

    this.consequent = []

    if (!parser.match('indention')) {
      this.syntaxError('Unexpected token')
    }

    for (const scope of parser.walkScope()) {
      const nextNode = scope.nextNode(this)
      const node = constants.EXPRESSIONS.includes(nextNode.type)
        ? parser.createNode('ExpressionStatement', nextNode)
        : nextNode

      this.isAllowedNode(node, ALLOWED_CHILDS)
      this.consequent.push(node)
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'SwitchCase',
      test: this.test ? this.test.resolve(ctx) : null,
      consequent: this.consequent.map((item) => item.resolve(ctx))
    })
  }
}

module.exports = SwitchCase
