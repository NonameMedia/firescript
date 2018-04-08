const FireScriptNode = require('./FireScriptNode')

const ALLOWED_ELEMENTS = [
  'Property'
]

class ObjectExpression extends FireScriptNode {
  constructor (tokenStack, parent, property) {
    super(parent)

    this.properties = []

    if (tokenStack.expect('punctuator', '{')) {
      tokenStack.goForward()
      if (!tokenStack.expect('indention')) {
        this.parseProperties(tokenStack)
        return
      }
    }

    if (tokenStack.expect('indention', this.indention + this.indentionSize)) {
      this.indention = tokenStack.getIndention()
      this.parseProperties(tokenStack)
    } else if (property) {
      this.properties.push(property)
      this.parseProperties(tokenStack)
    } else {
      this.syntaxError('Object declaration expected', tokenStack.current())
    }
  }

  parseProperties (tokenStack) {
    while (true) {
      if (tokenStack.expect('punctuator', '}')) {
        tokenStack.goForward()
        break
      }

      if (tokenStack.isIndention('lt', this.indention)) {
        tokenStack.goForward()
        if (tokenStack.expect('punctuator', ['}', ']'])) {
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
          this.properties.push(objectExpression)
          continue
        }

        const arrayExpression = this.tryArrayExpression(tokenStack)
        if (arrayExpression) {
          this.properties.push(arrayExpression)
          continue
        }

        this.syntaxError('Indention error', tokenStack.current())
      }

      if (tokenStack.expect('punctuator', ',')) {
        tokenStack.goForward()
        continue
      }

      const property = this.createPropertyNode(tokenStack)
      this.isAllowedNode(property, ALLOWED_ELEMENTS)
      this.properties.push(property)
    }
  }

  toJSON () {
    return this.createJSON({
      type: 'ObjectExpression',
      properties: this.properties.map((item) => item.toJSON())
    })
  }
}

module.exports = ObjectExpression
