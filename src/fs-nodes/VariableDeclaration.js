const FireScriptNode = require('./FireScriptNode')

class VariableDeclaration extends FireScriptNode {
  constructor (tokenStack, parent, kind) {
    super(parent)

    this.kind = kind || tokenStack.getRawValue()
    if (!['var', 'let', 'const'].includes(this.kind)) {
      this.syntaxError('Unexpected token, var let or const expected', tokenStack.previous())
    }

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
