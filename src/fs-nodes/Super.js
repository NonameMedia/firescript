const FireScriptNode = require('./FireScriptNode')

class Super extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    const token = tokenStack.next()

    if (token.type !== 'identifier' && token.value !== 'this') {
      this.syntaxError(`Super expected, but a ${token.type} was given`, token)
    }
  }

  toJSON () {
    return {
      type: 'Super'
    }
  }
}

module.exports = Super
