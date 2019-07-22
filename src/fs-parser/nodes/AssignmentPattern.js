const Node = require('./Node')
const constants = require('../../utils/constants')

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

class AssignmentPattern extends Node {
  constructor (parser, left) {
    super(parser)

    this.left = left || parser.nextRealNode(this)
    const token = parser.nextToken()

    if (token.type !== 'operator' && !constants.ASSIGNMENT_OPERATORS.includes(token.value)) {
      this.syntaxError('Token is not a assignment operator', token)
    }

    this.operator = token.value
    this.right = parser.nextNode(this)
    this.isAllowedNode(this.right, ALLOWED_CHILDS)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'AssignmentPattern',
      operator: this.operator,
      left: this.left.resolve(ctx),
      right: this.right.resolve(ctx)
    })
  }
}

module.exports = AssignmentPattern
