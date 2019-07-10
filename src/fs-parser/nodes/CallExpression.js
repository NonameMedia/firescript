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

    console.log('CALLEE', callee)
    parser.print('++CALEXP')

    this.callee = callee || parser.createNode('Identifier')
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

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'CallExpression',
      callee: this.callee.resolve(ctx),
      arguments: this.arguments.map((item) => item.resolve(ctx))
    })
  }
}

module.exports = CallExpression
