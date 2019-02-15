const FirescriptNode = require('./FirescriptNode')

const ALLOWED_ELEMENTS = [
  'AssignmentPattern',
  'Identifier',
  'ArrayPattern',
  'ObjectPattern',
  'RestElement',
  'Null'
]

class ArrayPattern extends FirescriptNode {
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

      if (tokenStack.expect('punctuator', ',')) {
        tokenStack.goForward()
        continue
      }

      const elements = this.createFullNode(tokenStack)
      this.isAllowedNode(elements, ALLOWED_ELEMENTS)
      this.elements.push(elements)
    }
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'ArrayPattern',
      elements: this.elements.map((item) => item.toJSON(ctx))
    })
  }
}

module.exports = ArrayPattern
