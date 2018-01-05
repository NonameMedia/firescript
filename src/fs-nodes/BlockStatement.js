const FireScriptNode = require('./FireScriptNode')

class BlockStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    const token = tokenStack.shift()

    if (token.type !== 'indention') {
      this.syntaxError('Unexpected token', token)
    }

    this.body = []
    this.indention = token.value

    console.log('TYPE', tokenStack[0])
    while (true) {
      const nextToken = tokenStack[0]
      if (nextToken.type === 'indention' && nextToken.value < this.indention) {
        break
      }

      this.body.push(this.createNode(tokenStack))
    }
  }

  toJSON () {
    return {
      type: 'BlockStatement',
      body: this.body.map((item) => item.toJSON())
    }
  }
}

module.exports = BlockStatement
