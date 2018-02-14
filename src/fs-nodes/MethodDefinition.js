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

    this.id = null
    this.static = false

    if (tokenStack.expect('identifier', 'static') && this.lookForward('identifier')) {
      this.static = true
      this.goForward()
    }

    tokenStack.print('METHOD -------')
    this.key = this.createNodeItem(tokenStack)
    this.isAllowedToken(this.key, ALLOWED_KEYS)

    this.value = this.createFunctionExpressionNode(tokenStack)
    this.isAllowedToken(this.value, ALLOWED_VALUES)
  }

  toJSON () {
    return {
      type: 'MethodDefinition',
      key: this.key.toJSON(),
      computed: false,
      value: this.value.toJSON(),
      kind: this.kind,
      static: this.static
    }
  }
}

module.exports = MethodDefinition
