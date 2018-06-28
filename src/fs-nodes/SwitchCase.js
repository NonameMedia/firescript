const FirescriptNode = require('./FirescriptNode')

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
 * @extends FirescriptNode
 *
 * interface SwitchStatement {
 *   type: 'SwitchStatement';
 *   discriminant: Expression;
 *   cases: SwitchCase[];
 * }
 */
class SwitchCase extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)
    this.isBlockScope = true

    if (!tokenStack.expect('keyword', ['case', 'default'])) {
      this.syntaxError('Unexpected token', tokenStack.current())
    }

    const type = tokenStack.getRawValue()

    if (type === 'case') {
      this.test = this.createFullNode(tokenStack)
      this.isAllowedNode(this.test, ALLOWED_TEST_EXPRESSIONS)
    } else {
      this.test = null
    }

    this.consequent = []

    if (!tokenStack.expect('indention')) {
      this.syntaxError('Unexpected token', tokenStack.current())
    }

    while (true) {
      const nextToken = tokenStack.current()
      if (!nextToken) {
        break
      }

      if (nextToken.type === 'indention') {
        if (tokenStack.isIndention('lte', this.indention)) {
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
    return this.createJSON({
      type: 'SwitchCase',
      test: this.test ? this.test.toJSON() : null,
      consequent: this.consequent.map((item) => item.toJSON())
    })
  }
}

module.exports = SwitchCase
