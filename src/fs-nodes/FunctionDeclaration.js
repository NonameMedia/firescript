const FireScriptNode = require('./FireScriptNode')

class FunctionDeclaration extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    let token = tokenStack.shift()
    if (!token.value === 'func') {
      this.syntaxError('Unexpected token', token)
    }

    this.id = this.createIdentifierNode(tokenStack)
    this.params = []

    token = tokenStack.shift()
    if (token.type === 'punctuator' && token.value === '(') {
      while (true) {
        const nextToken = tokenStack[0]
        if (nextToken.type === 'punctuator' && nextToken.value === ')') {
          tokenStack.shift()
          break
        }

        if (nextToken.type === 'identifier') {
          this.params.push(this.createNode(tokenStack))
          continue
        }

        if (nextToken.type === 'punctuator' && nextToken.value === ',') {
          tokenStack.shift()
          continue
        }
      }
    } else {
      console.log(token)
      this.syntaxError('Function arguments expected', token)
    }

    this.body = this.createNode(tokenStack)
  }

  toJSON () {
    return {
      type: 'FunctionDeclaration',
      id: this.id.toJSON(),
      params: this.params.map((item) => item.toJSON()),
      body: this.body.toJSON(),
      async: false,
      expression: false,
      generator: false
    }
  }
}

module.exports = FunctionDeclaration
