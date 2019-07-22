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

class ExpressionStatement extends Node {
  constructor (parser, expression) {
    super(parser, expression)

    this.expression = expression || parser.nextRealNode(this)
    this.isAllowedNode(this.expression, ALLOWED_CHILDS)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ExpressionStatement',
      expression: this.expression.resolve(ctx)
    })
  }
}

module.exports = ExpressionStatement
