const FireScriptNode = require('./FireScriptNode')

class ClassBody extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.body = []

    tokenStack.print()
    if (tokenStack.expect('indention')) {
      const token = tokenStack.next()
      this.indention = token.value
    } else {
      this.syntaxError('Unexpected token')
    }

    while (true) {
      if (tokenStack.isIndention('lte', this.indention - this.indentionSize)) {
        break
      }

      this.body.push(this.createMethodDefinitionNode(tokenStack))
    }
  }

  toJSON () {
    return {
      type: 'ClassBody',
      body: this.body.map((item) => item.toJSON())
    }
  }
}

module.exports = ClassBody
