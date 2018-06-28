const FirescriptNode = require('./FirescriptNode')

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

class CallExpression extends FirescriptNode {
  constructor (tokenStack, parent, callee) {
    super(tokenStack, parent)

    this.callee = callee || this.createIdentifierNode(tokenStack)
    this.isAllowedNode(this.callee, ALLOWED_CALLEE_TYPES, tokenStack.current())
    this.arguments = []

    if (!tokenStack.expect('punctuator', '(')) {
      this.syntaxError('Unexpected token', tokenStack.current())
    }

    tokenStack.goForward()

    while (true) {
      if (tokenStack.expect('punctuator', ')')) {
        tokenStack.goForward()
        break
      }

      if (tokenStack.expect('punctuator', ',')) {
        tokenStack.goForward()
        continue
      }

      const node = this.createFullNode(tokenStack)
      this.isAllowedNode(node, ALLOWED_ARGUMENT_TYPES, tokenStack.current())
      this.arguments.push(node)
    }
  }

  toJSON () {
    return this.createJSON({
      type: 'CallExpression',
      callee: this.callee.toJSON(),
      arguments: this.arguments.map((item) => item.toJSON())
    })
  }
}

module.exports = CallExpression
