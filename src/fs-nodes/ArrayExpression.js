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

    if (tokenStack.expect('punctuator', '[')) {
      this.parseCommonSyntax(tokenStack)
    } else if (tokenStack.expect('indention', this.indention + this.indentionSize)) {
      this.parseBracelessSyntax(tokenStack)
    } else {
      this.syntaxError('Array declaration expected', tokenStack.current())
    }
  }

  parseCommonSyntax (tokenStack) {
    tokenStack.goForward()

    while (true) {
      if (tokenStack.expect('punctuator', ']')) {
        tokenStack.goForward()
        break
      }

      if (tokenStack.expect('punctuator', ',')) {
        tokenStack.goForward()
        continue
      }

      const elements = this.createNode(tokenStack)
      this.isAllowedToken(elements, ALLOWED_ELEMENTS)
      this.elements.push(elements)
    }
  }

  parseBracelessSyntax (tokenStack) {
    tokenStack.goForward()
    const childIndention = this.indention + this.indentionSize
    console.log(tokenStack, this.indention, childIndention)

    while (true) {
      console.log('CHECK', tokenStack.current())
      if (tokenStack.isIndention(this.indention, 'lte')) {
        tokenStack.goForward()
        console.log('BRK')
        break
      }

      if (tokenStack.isIndention(childIndention, 'eq')) {
        console.log('CONT')
        tokenStack.goForward()
        continue
      }

      if (tokenStack.expect('indention')) {
        this.syntaxError('Invalid indention', tokenStack.current())
      }

      console.log(tokenStack, this.indention, childIndention)
      console.log(tokenStack.current())
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
