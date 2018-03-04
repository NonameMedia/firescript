const FireScriptNode = require('./FireScriptNode')

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
  'WithStatement'
]
/**
 * SwitchCase
 *
 * @class SwitchCase
 * @extends FireScriptNode
 *
 * interface SwitchStatement {
 *   type: 'SwitchStatement';
 *   discriminant: Expression;
 *   cases: SwitchCase[];
 * }
 */
class SwitchCase extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)
    this.isBlockScope = true

    if (!tokenStack.expect('keyword', 'case')) {
      this.syntaxError('Unexpected token', tokenStack.current())
    }

    tokenStack.goForward()
    this.test = this.createFullNode(tokenStack)
    this.isAllowedNode(this.test, ALLOWED_TEST_EXPRESSIONS)

    this.consequent = []

    if (!tokenStack.expect('indention')) {
      this.syntaxError('Unexpected token', tokenStack.current())
    }

    this.indention = tokenStack.getRawValue()

    while (true) {
      const nextToken = tokenStack.current()
      if (!nextToken) {
        break
      }

      if (nextToken.type === 'indention') {
        if (tokenStack.isIndention('lt', this.indention)) {
          tokenStack.goForward()
          break
        }
        tokenStack.goForward()
      }

      const node = this.createFullNode(tokenStack)
      if (node.type === 'Null') {
        break
      }

      this.isAllowedNode(node, ALLOWED_CHILDS)
      this.consequent.push(node)
    }
  }

  toJSON () {
    return {
      type: 'SwitchCase',
      test: this.test.toJSON(),
      consequent: this.consequent.map((item) => item.toJSON())
    }
  }
}

module.exports = SwitchCase
