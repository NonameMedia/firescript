const Node = require('./Node')

const ALLOWED_KEYS = [
  // 'ThisExpression',
  'Identifier',
  'Literal',
  'SpreadElement',
  'Comment'
  // 'ArrayExpression',
  // 'ObjectExpression',
  // 'FunctionExpression',
  // 'ArrowFunctionExpression',
  // 'ClassExpression',
  // 'TaggedTemplateExpression',
  // 'MemberExpression',
  // 'Super',
  // 'MetaProperty',
  // 'NewExpression',
  // 'CallExpression',
  // 'UpdateExpression',
  // 'AwaitExpression',
  // 'UnaryExpression',
  // 'BinaryExpression',
  // 'LogicalExpression',
  // 'ConditionalExpression',
  // 'YieldExpression',
  // 'AssignmentExpression',
  // 'SequenceExpression',
  // 'Null'
]

const ALLOWED_VALUES = [
  'FunctionExpression',
  'Null',
  'Comment'
]

class MethodDefinition extends Node {
  constructor (parser) {
    super(parser)

    this.static = false
    this.async = false
    this.kind = 'method'

    if (parser.match('identifier "static" > identifier') || parser.match('identifier "static" > keyword "async" > identifier')) {
      this.static = true
      parser.skipNext()
    }

    if (parser.match('keyword "async" > identifier')) {
      this.async = true
      parser.skipNext()
    }

    if (parser.match('identifier [get,set] > identifier')) {
      const next = parser.nextToken()
      this.kind = next.value
    }

    this.key = parser.nextRealNode(this)
    if (this.key.type === 'Identifier' && this.key.name === 'constructor') {
      this.kind = 'constructor'
    }

    this.isAllowedNode(this.key, ALLOWED_KEYS)

    this.value = parser.createNode('FunctionExpression')
    this.isAllowedNode(this.value, ALLOWED_VALUES)
  }

  resolve (ctx) {
    const json = this.createJSON(ctx, {
      type: 'MethodDefinition',
      key: this.key.resolve(ctx),
      computed: false,
      value: this.value.resolve(ctx),
      kind: this.kind,
      static: this.static
    })

    if (this.async) {
      json.value.async = true
    }

    return json
  }
}

module.exports = MethodDefinition
