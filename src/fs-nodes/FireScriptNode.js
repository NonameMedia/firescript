class FireScriptNode {
  constructor (parent) {
    this.parent = parent || null
  }

  createNode (tokenStack) {
    const token = tokenStack.shift()
    if (!token) {
      return null
    }

    // if (nextToken.type === 'indention') {
    //   this.getToken('Token')
    //   return this.parseToken()
    // }
    //
    if (token.type === 'keyword') {
    //   if (nextToken.value === 'import') {
    //     return this.parseImportDeclaration()
    //   }

      if (token.value === 'func') {
        return this.getNodeInstance('FunctionDeclaration', tokenStack)
      }

      //   if (['var', 'const', 'let'].includes(nextToken.value)) {
      //     return this.parseVariableDeclaration()
      //   }
      // }
      //
    }

    if (token.type === 'identifier') {
      return this.getNodeInstance('Identifier', tokenStack)
    }
    //
    // if (nextToken.type === 'literal') {
    //   return this.parseLiteral()
    // }
    //
    // if (nextToken.type === 'punctation') {
    //   if (this.binaryOperatorPattern.test(nextToken.value)) {
    //     return this.parseBinaryExpression()
    //   }

    console.log('UNUSED TOKEN', token)
    this.syntaxError('Unexpected token', token)
  }

  syntaxError (message, token) {
    const err = new SyntaxError(`${message} at line ${token.line[0]} at column ${token.line[1]}`)
    err.token = token
    throw err
  }

  getNodeInstance (nodeName, tokenStack) {
    const Node = require(`./${nodeName}`)
    return new Node(tokenStack, this)
  }
}

module.exports = FireScriptNode
