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

      if (nextToken.type === 'punctuator' && nextToken.value === ',') {
        tokenStack.next()
        this.declarations.push(this.createVariableDeclaratorNode(tokenStack))
      } else if (nextToken.type === 'identifier' || nextToken.type === 'operator') {
        this.declarations.push(this.createVariableDeclaratorNode(tokenStack))
      } else {
        break
      }
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
