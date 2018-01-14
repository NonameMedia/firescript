const FireScriptNode = require('./FireScriptNode')

const ALLOWED_ELEMENTS = [
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
  'SequenceExpression',
  'SpreadElement'
]

class ObjectExpression extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    const token = tokenStack.next()
    if (token.type !== 'punctuator' && token.value !== '[') {
      this.syntaxError('Array declaration expected', token)
    }

    this.elements = []

    while (true) {
      if (tokenStack.lookForward('punctuator', ']')) {
        tokenStack.goForward()
        break
      }

      if (tokenStack.lookForward('punctuator', ',')) {
        tokenStack.goForward()
        continue
      }

      const elements = this.createNode(tokenStack)
      this.isAllowedToken(elements, ALLOWED_ELEMENTS)
      this.elements.push(elements)
    }
  }

  toJSON () {
    return {
      type: 'ObjectExpression',
      elements: this.elements.map((item) => item.toJSON())
    }
  }
}

module.exports = ObjectExpression
