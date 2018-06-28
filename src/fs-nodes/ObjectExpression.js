const FirescriptNode = require('./FirescriptNode')

const ALLOWED_ELEMENTS = [
  'Property'
]

class ObjectExpression extends FirescriptNode {
  constructor (tokenStack, parent, property) {
    super(tokenStack, parent)

    this.properties = []

    if (tokenStack.expect('punctuator', '{')) {
      tokenStack.goForward()
      if (!tokenStack.expect('indention')) {
        this.parseProperties(tokenStack, this.indention)
        return
      }
    }

    const childIndention = this.indention + this.indentionSize
    if (tokenStack.expect('indention', childIndention)) {
      this.parseProperties(tokenStack, childIndention)
    } else if (property) {
      this.properties.push(property)
      this.parseProperties(tokenStack, childIndention)
    } else {
      this.syntaxError('Object declaration expected', tokenStack.current())
    }
  }

  parseProperties (tokenStack, childIndention) {
    while (true) {
      if (!tokenStack.current()) {
        break
      }

      if (tokenStack.expect('punctuator', '}')) {
        tokenStack.goForward()
        break
      }

      if (tokenStack.isIndention('lt', childIndention)) {
        tokenStack.goForward()
        if (tokenStack.expect('punctuator', ['}', ']'])) {
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
