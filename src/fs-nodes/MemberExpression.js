const FireScriptNode = require('./FireScriptNode')

class MemberExpression extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    const token = tokenStack.next()

    if (token.type !== 'identifier' && token.value !== 'this') {
      this.syntaxError(`MemberExpression expected, but a ${token.type} was given`, token)
    }
  }

  toJSON () {
    return {
      type: 'MemberExpression',
      computed: false,
      object: this.object.toJson(),
      property: this.property.toJson()
    }
  }
}

module.exports = MemberExpression
