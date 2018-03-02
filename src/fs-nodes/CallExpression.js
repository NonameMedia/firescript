const FireScriptNode = require('./FireScriptNode')

const ALLOWED_CALLEE_TYPES = [
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

class CallExpression extends FireScriptNode {
  constructor (tokenStack, parent, callee) {
    super(parent)

    console.log('CALLEE', callee)
    this.callee = callee || this.createIdentifierNode(tokenStack)
    this.isAllowedNode(this.callee, ALLOWED_CALLEE_TYPES, tokenStack.current())
    this.arguments = []

    tokenStack.print()
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
    return {
      type: 'CallExpression',
      callee: this.callee.toJSON(),
      arguments: this.arguments.map((item) => item.toJSON())
    }
  }
}

module.exports = CallExpression
