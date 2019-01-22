const FirescriptNode = require('./FirescriptNode')

class ObjectExpression extends FirescriptNode {
  constructor (tokenStack, parent, property) {
    super(tokenStack, parent)

    this.properties = []

    for (const scope of this.walkScope()) { // eslint-disable-line no-unused-vars
      const property = this.createPropertyNode(tokenStack)
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
