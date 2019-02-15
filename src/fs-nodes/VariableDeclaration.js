const FirescriptNode = require('./FirescriptNode')

class VariableDeclaration extends FirescriptNode {
  constructor (tokenStack, parent, kind) {
    super(tokenStack, parent)

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

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'VariableDeclaration',
      kind: this.kind,
      declarations: this.declarations.map((item) => item.toJSON(ctx))
    })
  }
}

module.exports = VariableDeclaration
