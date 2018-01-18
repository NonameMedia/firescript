const FireScriptNode = require('./FireScriptNode')

class ClassBody extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.body = []

    while (true) {
      if (tokenStack.isIndention(this.indention - this.indentionSize, 'lte')) {
        break
      }

      this.createMethodDefinitionNode(tokenStack)
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
