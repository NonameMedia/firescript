const FireScriptNode = require('./FireScriptNode')

class VariableDeclaration extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    const token = tokenStack.shift()

    if (!['var', 'let', 'const'].includes(token.value)) {
      this.syntaxError('Unexpected token, var let or const expected', token)
    }

    this.kind = token.value
    this.declarations = []

    while (true) {
      const nextToken = tokenStack[0]
      console.log('NEXT', nextToken)
      if (nextToken.type === 'punctation' && nextToken.value === ',') {
        tokenStack.shift()
        this.declarations.push(this.createVariableDeclaratorNode(tokenStack))
      } else if (nextToken.type === 'identifier' || nextToken.type === 'punctation') {
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
