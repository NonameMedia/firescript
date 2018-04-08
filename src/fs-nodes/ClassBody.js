const FireScriptNode = require('./FireScriptNode')

class ClassBody extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.body = []

    if (tokenStack.expect('indention')) {
      const token = tokenStack.next()
      this.indention = token.value
    } else {
      this.syntaxError('Unexpected token')
    }

    while (true) {
      if (tokenStack.lastIndention('lte', this.indention - this.indentionSize, tokenStack.getIndention())) {
        break
      }

      this.body.push(this.createMethodDefinitionNode(tokenStack))
    }
  }

  toJSON () {
    return this.createJSON({
      type: 'ClassBody',
      body: this.body.map((item) => item.toJSON())
    })
  }
}

module.exports = ClassBody
