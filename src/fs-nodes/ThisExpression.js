const FirescriptNode = require('./FirescriptNode')

class ThisExpression extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    const token = tokenStack.next()

    if (token.type !== 'identifier' && token.value !== 'this') {
      this.syntaxError(`ThisExpression expected, but a ${token.type} was given`, token)
    }
  }

  toJSON () {
    return this.createJSON({
      type: 'ThisExpression'
    })
  }
}

module.exports = ThisExpression
