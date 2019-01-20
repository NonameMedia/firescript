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
        tokenStack.goForward()
        break
      }

      if (tokenStack.isIndention('gt', this.indention)) {
        tokenStack.goForward()
        continue
      }

      const node = this.createNodeItem(tokenStack)
      if (!node || node.type === 'Null') {
        break
      }

      this.isAllowedNode(node, [
        'Comment',
        'MethodDefinition'
      ])

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
