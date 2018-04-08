const FireScriptNode = require('./FireScriptNode')

const ALLOWED_KEYS = [
  // 'ThisExpression',
  'Identifier',
  'Literal'
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
  'Null'
]

class MethodDefinition extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.static = false
    this.kind = 'method'

    if (tokenStack.expect('identifier', 'static') && this.lookForward('identifier')) {
      this.static = true
      this.goForward()
    }

    this.key = this.createNodeItem(tokenStack)
    if (this.key.type === 'Identifier' && this.key.name === 'constructor') {
      this.kind = 'constructor'
    }

    this.isAllowedNode(this.key, ALLOWED_KEYS)

    this.value = this.createFunctionExpressionNode(tokenStack)
    this.isAllowedNode(this.value, ALLOWED_VALUES)
  }

  toJSON () {
    return this.createJSON({
      type: 'MethodDefinition',
      key: this.key.toJSON(),
      computed: false,
      value: this.value.toJSON(),
      kind: this.kind,
      static: this.static
    })
  }
}

module.exports = MethodDefinition
