const FireScriptNode = require('./FireScriptNode')

class ClassBody extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.body = []
    const parentIndention = this.indention
    const currentIndention = this.indention + this.indentionSize

    while (true) {
      if (tokenStack.expect('indention')) {
        const token = tokenStack.next()
        this.indention = token.value
      } else {
        this.syntaxError(`Indention of ${parentIndention} expected, but it is ${currentIndention}`, tokenStack)
      }

      console.log('INDENTION', this.indention, this.indentionSize, tokenStack.isIndention(this.indention - this.indentionSize, 'lte'))
      if (tokenStack.isIndention(this.indention - this.indentionSize, 'lte')) {
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
