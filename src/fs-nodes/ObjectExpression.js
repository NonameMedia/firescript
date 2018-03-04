const FireScriptNode = require('./FireScriptNode')

const ALLOWED_ELEMENTS = [
  'Property'
]

class ObjectExpression extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.properties = []

    if (tokenStack.expect('punctuator', '{')) {
      this.parseCommonSyntax(tokenStack)
      if (tokenStack.expect('punctuator', '}')) {
        tokenStack.goForward()
      }
    } else if (tokenStack.expect('indention', this.indention + this.indentionSize)) {
      this.parseBracelessSyntax(tokenStack)
    } else {
      this.syntaxError('Object declaration expected', tokenStack.current())
    }
  }

  parseCommonSyntax (tokenStack) {
    tokenStack.goForward()

    this.indention = tokenStack.getIndention()

    while (true) {
      if (tokenStack.expect('punctuator', '}')) {
        tokenStack.goForward()
        break
      }

      const property = this.createPropertyNode(tokenStack)
      this.isAllowedNode(property, ALLOWED_ELEMENTS)
      this.properties.push(property)

      if (tokenStack.expect('punctuator', ',')) {
        tokenStack.goForward()
        continue
      } else if (tokenStack.expect('indention')) {
        if (tokenStack.isIndention('lt', this.indention)) {
          tokenStack.goForward()
          break
        } else if (tokenStack.isIndention('eq', this.indention)) {
          tokenStack.goForward()
          continue
        } else {
          this.syntaxError('Indetion error!')
        }
      } else if (tokenStack.expect('punctuator', '}')) {
        tokenStack.goForward()
        break
      } else {
        this.syntaxError('Unexpected token!', tokenStack.current())
      }

      break
    }
  }

  parseBracelessSyntax (tokenStack) {
    tokenStack.goForward()
    const childIndention = this.indention + this.indentionSize

    while (true) {
      if (tokenStack.isIndention('lte', this.indention)) {
        tokenStack.goForward()
        break
      }

      if (tokenStack.isIndention('eq', childIndention)) {
        tokenStack.goForward()
        continue
      }

      if (tokenStack.expect('indention')) {
        this.syntaxError('Invalid indention', tokenStack.current())
      }

      const property = this.createPropertyNode(tokenStack)
      this.isAllowedNode(property, ALLOWED_ELEMENTS)
      this.properties.push(property)
    }
  }

  toJSON () {
    return {
      type: 'ObjectExpression',
      properties: this.properties.map((item) => item.toJSON())
    }
  }
}

module.exports = ObjectExpression
