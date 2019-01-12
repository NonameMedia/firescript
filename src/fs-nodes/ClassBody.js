const FirescriptNode = require('./FirescriptNode')

class ClassBody extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    this.body = []

    if (!tokenStack.expect('indention')) {
      this.syntaxError('Unexpected token')
    }

    const token = tokenStack.next()
    const indention = token.value

    while (true) {
      if (tokenStack.lastIndention('lte', indention - this.indentionSize, tokenStack.getIndention())) {
        break
      }

      if (tokenStack.expect('comment')) {
        this.body.push(this.createCommentNode(tokenStack))
      } else {
        this.body.push(this.createMethodDefinitionNode(tokenStack))
      }
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
