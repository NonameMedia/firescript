const FirescriptNode = require('./FirescriptNode')

const ALLOWED_CALLEE_TYPES = [
  'ThisExpression',
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
  // 'SequenceExpression'
]

class NewExpression extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('keyword', 'new')) {
      this.syntaxError('NewExpression expected!', tokenStack.current())
    }

    tokenStack.goForward()

    this.callee = this.createIdentifierNode(tokenStack)
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

      this.arguments.push(this.createNodeItem(tokenStack))
    }
  }

  toJSON () {
    return this.createJSON({
      type: 'NewExpression',
      callee: this.callee.toJSON(),
      arguments: this.arguments.map((item) => item.toJSON())
    })
  }
}

module.exports = NewExpression
