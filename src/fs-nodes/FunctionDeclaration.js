const FireScriptNode = require('./FireScriptNode')

class FunctionDeclaration extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.id = this.createNode(tokenStack)
  }

  parseFunctionDeclaration () {
    let params = []
    let body = {}

    let token = this.getToken('FunctionDeclaration')
    if (!token.type === 'func') {
      this.syntaxError(`${token.value} is not a function expression`, token)
    }

    const id = this.parseIdentifier()

    token = this.getToken('FunctionDeclaration')
    if (token.type === 'punctation' && token.value === '(') {
      while (true) {
        const nextToken = this.getNextToken()
        console.log('TOK', nextToken)
        if (nextToken.type === 'punctation' && nextToken.value === ')') {
          this.getToken('FunctionDeclaration')
          break
        }

        if (nextToken.type === 'identifier') {
          params.push(this.parseIdentifier())
          continue
        }

        if (nextToken.type === 'punctation' && nextToken.value === ',') {
          this.getToken('FunctionDeclaration')
          continue
        }
      }
    } else {
      this.syntaxError('Function arguments expected', token)
    }

    const node = {
      async: false,
      expression: false,
      generator: false,
      type: 'FunctionDeclaration',
      id,
      params,
      body
    }

    return node
  }

  toJSON () {
    return {
      id: this.id
    }
  }
}

module.exports = FunctionDeclaration
