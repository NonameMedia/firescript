const FireScriptNode = require('./FireScriptNode')

class VariableDeclaration extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    const token = tokenStack.next()

    if (!['var', 'let', 'const'].includes(token.value)) {
      this.syntaxError('Unexpected token, var let or const expected', token)
    }

    this.kind = token.value
    this.declarations = []

    while (true) {
      const nextToken = tokenStack.current()
      if (!nextToken) {
        break
      }

      this.declarations.push(this.createVariableDeclaratorNode(tokenStack))
      if (tokenStack.expect('punctuator', ',')) {
        tokenStack.goForward()
        continue
      }

      break
    }
  }

  toJSON () {
    return {
      type: 'VariableDeclaration',
      kind: this.kind,
      declarations: this.declarations.map((item) => item.toJSON())
    }
  }
}

module.exports = VariableDeclaration
