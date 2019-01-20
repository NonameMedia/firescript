const FirescriptNode = require('./FirescriptNode')

const ALLOWED_ELEMENTS = [
  'ThisExpression',
  'Identifier',
  'Literal',
  'TemplateLiteral',
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

class ArrayExpression extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    this.elements = []

    if (tokenStack.expect('punctuator', '[')) {
      tokenStack.goForward()
      if (!tokenStack.expect('indention')) {
        this.parseElements(tokenStack, this.indention)
        return
      }
    }

    const childIndention = this.indention + this.indentionSize
    if (tokenStack.expect('indention', childIndention)) {
      this.parseElements(tokenStack, childIndention)
    } else {
      this.syntaxError('Array declaration expected', tokenStack.current())
    }
  }

  parseElements (tokenStack, childIndention) {
    while (true) {
      if (tokenStack.expect('punctuator', ']')) {
        tokenStack.goForward()
        break
      }

      if (tokenStack.isIndention('lt', childIndention)) {
        tokenStack.goForward()
        if (tokenStack.expect('punctuator', ']')) {
          tokenStack.goForward()
        }

        break
      }

      if (tokenStack.isIndention('eq', childIndention)) {
        tokenStack.goForward()
        continue
      }

      if (tokenStack.isIndention('gt', childIndention)) {
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
