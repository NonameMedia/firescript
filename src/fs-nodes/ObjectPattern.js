const FireScriptNode = require('./FireScriptNode')

const ALLOWED_ELEMENTS = [
  'Property'
]

class ObjectPattern extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.properties = []

    if (tokenStack.expect('punctuator', '{')) {
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
      if (tokenStack.expect('punctuator', '}')) {
        tokenStack.goForward()
        break
      }

      if (tokenStack.expect('punctuator', ',')) {
        tokenStack.goForward()
        continue
      }

      const property = this.createPropertyNode(tokenStack)
      this.isAllowedToken(property, ALLOWED_ELEMENTS)
      this.properties.push(property)
    }
  }

  parseBracelessSyntax (tokenStack) {
    tokenStack.goForward()
    const childIndention = this.indention + this.indentionSize

    while (true) {
      if (tokenStack.isIndention(this.indention, 'lte')) {
        tokenStack.goForward()
        break
      }

      if (tokenStack.isIndention(childIndention, 'eq')) {
        tokenStack.goForward()
        continue
      }

      if (tokenStack.expect('indention')) {
        this.syntaxError('Invalid indention', tokenStack.current())
      }

      const property = this.createPropertyNode(tokenStack)
      this.isAllowedToken(property, ALLOWED_ELEMENTS)
      this.properties.push(property)
    }
  }

  toJSON () {
    return {
      type: 'ObjectPattern',
      properties: this.properties.map((item) => item.toJSON())
    }
  }
}

module.exports = ObjectPattern
