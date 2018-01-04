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
      if (nextToken.type === 'identifier') {
        this.declarations.push(this.parseVariableDeclarator(tokenStack))
      } else {
        break
      }
    }
  }

  parseVariableDeclarator (tokenStack) {
    const node = {
      type: 'VariableDeclarator',
      id: this.createNode(tokenStack),
      init: null
    }

    const nextToken = tokenStack[0]
    if (nextToken.type === 'punctation' && nextToken.value === '=') {
      tokenStack.shift()
      node.init = this.createNode(tokenStack)
    }

    return node
  }

  toJSON () {
    return {
      type: 'VariableDeclaration',
      kind: this.kind,
      declarations: this.declarations
    }
  }
}

module.exports = VariableDeclaration
