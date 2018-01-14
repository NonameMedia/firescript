const FireScriptNode = require('./FireScriptNode')

class ThisExpression extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    const token = tokenStack.next()

    if (token.type !== 'identifier' && token.value !== 'this') {
      this.syntaxError(`ThisExpression expected, but a ${token.type} was given`, token)
    }
  }

  toJSON () {
    return {
      type: 'ThisExpression'
    }
  }
}

module.exports = ThisExpression
