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

class ArrayExpression extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.elements = []

    while (true) {
      if (this.lookForward(tokenStack, 'punctation', ']')) {
        tokenStack.shift()
        break
      }

      const elements = this.createNode(tokenStack)
      this.isAllowedToken(elements, ALLOWED_ELEMENTS)
      this.elements.push(elements)
    }
  }

  toJSON () {
    return {
      type: 'ArrayExpression',
      elements: this.elements.map((item) => item.toJSON())
    }
  }
}

module.exports = ArrayExpression
