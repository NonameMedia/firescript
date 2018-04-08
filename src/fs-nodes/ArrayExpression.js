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
      tokenStack.goForward()
      if (!tokenStack.expect('indention')) {
        this.parseElements(tokenStack)
        return
      }
    }

    if (tokenStack.expect('indention', this.indention + this.indentionSize)) {
      this.indention = tokenStack.getIndention()
      this.parseElements(tokenStack)
    } else {
      this.syntaxError('Array declaration expected', tokenStack.current())
    }
  }

  parseElements (tokenStack) {
    while (true) {
      if (tokenStack.expect('punctuator', ']')) {
        tokenStack.goForward()
        break
      }

      if (tokenStack.isIndention('lt', this.indention)) {
        tokenStack.goForward()
        if (tokenStack.expect('punctuator', ']')) {
          tokenStack.goForward()
        }

        break
      }

      if (tokenStack.isIndention('eq', this.indention)) {
        tokenStack.goForward()
        continue
      }

      if (tokenStack.isIndention('gt', this.indention)) {
        const objectExpression = this.tryObjectExpression(tokenStack)
        if (objectExpression) {
          this.elements.push(objectExpression)
          continue
        }

        const arrayExpression = this.tryArrayExpression(tokenStack)
        if (arrayExpression) {
          this.elements.push(arrayExpression)
          continue
        }

        this.syntaxError('Indention error', tokenStack.current())
      }

      if (tokenStack.expect('punctuator', ',')) {
        tokenStack.goForward()
        continue
      }

      const elements = this.createFullNode(tokenStack)
      this.isAllowedNode(elements, ALLOWED_ELEMENTS)
      this.elements.push(elements)
    }
  }

  toJSON () {
    return this.createJSON({
      type: 'ArrayExpression',
      elements: this.elements.map((item) => item.toJSON())
    })
  }
}

module.exports = ArrayExpression
