const FirescriptNode = require('./FirescriptNode')

const ALLOWED_CHILDS = [
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
 * SequenceExpression
 *
 * @class SequenceExpression
 * @extends FirescriptNode
 *
 * interface SequenceExpression {
 *   type: 'SequenceExpression';
 *   expressions: Expression[];
 * }
 */
class SequenceExpression extends FirescriptNode {
  constructor (tokenStack, parent, expression) {
    super(tokenStack, parent)

    this.expressions = []
    if (expression) {
      this.expressions.push(expression)
      tokenStack.goForward()
    }

    while (true) {
      const expression = this.createFullNode(tokenStack)
      this.isAllowedNode(expression, ALLOWED_CHILDS)
      this.expressions.push(expression)

      if (tokenStack.expect('punctuator', ',')) {
        tokenStack.goForward()
        continue
      }

      break
    }
  }

  toJSON () {
    return this.createJSON({
      type: 'SequenceExpression',
      expressions: this.expressions.map((item) => item.toJSON())
    })
  }
}

module.exports = SequenceExpression
