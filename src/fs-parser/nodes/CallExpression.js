const Node = require('./Node')

const ALLOWED_CALLEE_TYPES = [
  'ThisExpression',
  'Identifier',
  'Literal',
  'ArrayExpression',
  'ObjectExpression',
  'FunctionExpression',
  'ArrowFunctionExpression',
  'ClassExpression',
  'TemplateLiteral',
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

const ALLOWED_ARGUMENT_TYPES = [
  'ThisExpression',
  'Identifier',
  'Literal',
  'ArrayExpression',
  'ObjectExpression',
  'FunctionExpression',
  'ArrowFunctionExpression',
  'ClassExpression',
  'TemplateLiteral',
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
  'SequenceExpression',
  'SpreadElement'
]

class CallExpression extends Node {
  constructor (parser, callee) {
    super(parser)

    if (!callee) {
      throw new Error('Callee argument is not set!')
    }

    this.callee = callee
    this.isAllowedNode(this.callee, ALLOWED_CALLEE_TYPES)
    this.arguments = []

    if (!parser.match('punctuator "("')) {
      this.syntaxError('Unexpected token')
    }

    for (const scope of parser.walkScope()) {
      const node = scope.nextNode(this)
      if (node.type === 'Comment') {
        // TODO implement -> this.addComment(node)
        continue
      }

      this.isAllowedNode(node, ALLOWED_ARGUMENT_TYPES)
      this.arguments.push(node)
    }
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'CallExpression',
      callee: this.callee.toJSON(ctx),
      arguments: this.arguments.map((item) => item.toJSON(ctx))
    })
  }
}

module.exports = CallExpression
