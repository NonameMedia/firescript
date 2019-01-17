const FirescriptNode = require('./FirescriptNode')

class ClassBody extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    this.body = []

    if (!tokenStack.expect('indention')) {
      this.syntaxError('Unexpected token')
    }

    const token = tokenStack.next()
    this.indention = token.value

    while (true) {
      if (this.isOutdented()) {
        break
      }

      if (tokenStack.isIndention('lt', this.indention)) {
        break
      }

      if (tokenStack.isIndention('gte', this.indention)) {
        tokenStack.goForward()
        continue
      }

      tokenStack.print()
      const node = this.createNodeItem(tokenStack)
      if (!node) {
        break
      }

      this.isAllowedNode(node, [
        'Comment',
        'MethodDefinition'
      ])

      console.log('NEXT NODE', node.type)
      this.body.push(node)
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
