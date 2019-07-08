const Node = require('./Node')

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
 * @extends Node
 *
 * interface SequenceExpression {
 *   type: 'SequenceExpression';
 *   expressions: Expression[];
 * }
 */
class SequenceExpression extends Node {
  constructor (parser, expression) {
    super(parser)

    this.expressions = []
    if (expression) {
      this.expressions.push(expression)
      parser.skipNext()
    }

    while (true) {
      const expression = parser.nextNode(this)
      this.isAllowedNode(expression, ALLOWED_CHILDS)
      this.expressions.push(expression)

      if (parser.match('punctuator ","')) {
        parser.skipNext()
        continue
      }

      break
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'SequenceExpression',
      expressions: this.expressions.map((item) => item.resolve(ctx))
    })
  }
}

module.exports = SequenceExpression
