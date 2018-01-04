class FireScriptNode {
  constructor (parent) {
    this.parent = parent || null
    this.callStack = parent ? parent.callStack : []
  }

  createNode (tokenStack) {
    const nextToken = tokenStack[0]
    if (!nextToken) {
      return null
    }

    this.callStack.push(`${this.constructor.name} @ ${nextToken.type} | ${nextToken.value}`)

    // if (nextToken.type === 'indention') {
    //   this.getToken('Token')
    //   return this.parseToken()
    // }
    //
    if (nextToken.type === 'keyword') {
    //   if (nextToken.value === 'import') {
    //     return this.parseImportDeclaration()
    //   }

      if (nextToken.value === 'func') {
        return this.getNodeInstance('FunctionDeclaration', tokenStack)
      }

      //   if (['var', 'const', 'let'].includes(nextToken.value)) {
      //     return this.parseVariableDeclaration()
      //   }
      // }
      //
    }

    if (nextToken.type === 'identifier') {
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

    console.log('UNUSED TOKEN', nextToken)
    this.syntaxError('Unexpected token', nextToken)
  }

  syntaxError (message, token) {
    const err = new SyntaxError(`${message} at line ${token.line[0]} at column ${token.line[1]}`)
    err.token = token
    err.callStack = this.callStack
    throw err
  }

  getNodeInstance (nodeName, tokenStack) {
    const Node = require(`./${nodeName}`)
    return new Node(tokenStack, this)
  }
}

module.exports = FireScriptNode
