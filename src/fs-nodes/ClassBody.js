const FireScriptNode = require('./FireScriptNode')

class ClassBody extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.body = []
    while (true) {
      if (tokenStack.expect('indention')) {
        const token = tokenStack.next()
        this.indention = token.value
      }

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
