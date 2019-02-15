const FirescriptNode = require('./FirescriptNode')

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

class MethodDefinition extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    this.static = false
    this.async = false
    this.kind = 'method'

    if (tokenStack.expect('identifier', 'static') && (tokenStack.lookForward('identifier') || tokenStack.lookForward('keyword', 'async'))) {
      this.static = true
      tokenStack.goForward()
    }

    if (tokenStack.expect('keyword', 'async') && tokenStack.lookForward('identifier')) {
      this.async = true
      tokenStack.goForward()
    }

    if (tokenStack.expect('identifier', ['get', 'set']) && tokenStack.lookForward('identifier')) {
      const next = tokenStack.next()
      this.kind = next.value
    }

    if (tokenStack.expect('keyword', ['log'])) {
      tokenStack.changeType('identifier')
    }

    this.key = this.createNodeItem(tokenStack)
    if (this.key.type === 'Identifier' && this.key.name === 'constructor') {
      this.kind = 'constructor'
    }

    this.isAllowedNode(this.key, ALLOWED_KEYS)

    this.value = this.createFunctionExpressionNode(tokenStack)
    this.isAllowedNode(this.value, ALLOWED_VALUES)

    this.tearDown()
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'MethodDefinition',
      key: this.key.toJSON(ctx),
      computed: false,
      value: this.value.toJSON(ctx),
      kind: this.kind,
      static: this.static,
      async: this.async
    })
  }
}

module.exports = MethodDefinition
