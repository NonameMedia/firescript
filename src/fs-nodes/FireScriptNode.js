class FireScriptNode {
  constructor (parent) {
    this.parent = parent || null
    this.indention = parent ? parent.indention : 0
    this.callStack = parent ? parent.callStack : []
    this.binaryOperatorPattern = /^[+*/&-]$/
    this.assignmentOperatorPattern = /^[=]$/
    this.type = this.constructor.name
  }

  createNode (tokenStack) {
    const nextToken = tokenStack[0]
    if (!nextToken) {
      return null
    }

    if (nextToken.type === 'indention') {
      if (this.indention < nextToken.value) {
        return this.getNodeInstance('BlockStatement', tokenStack)
      } else {
        tokenStack.shift()
      }

      return this.createNode(tokenStack)
    }

    if (nextToken.type === 'keyword') {
      if (nextToken.value === 'import') {
        return this.getNodeInstance('ImportDeclaration', tokenStack)
      }

      if (nextToken.value === 'func') {
        return this.getNodeInstance('FunctionDeclaration', tokenStack)
      }

      if (['var', 'const', 'let'].includes(nextToken.value)) {
        return this.getNodeInstance('VariableDeclaration', tokenStack)
      }

      if (nextToken.value === 'return') {
        return this.getNodeInstance('ReturnStatement', tokenStack)
      }

      if (nextToken.value === 'super') {
        return this.getNodeInstance('Super', tokenStack)
      }
    }

    if (nextToken.type === 'identifier') {
      if (this.lookForward(tokenStack, 'operator', '=', 1)) {
        return this.getNodeInstance('ExpressionStatement', tokenStack)
      }

      if (this.lookForward(tokenStack, 'punctuator', '(', 1)) {
        return this.getNodeInstance('ExpressionStatement', tokenStack)
      }

      if (nextToken.value === 'this') {
        return this.getNodeInstance('ThisExpression', tokenStack)
      }

      return this.getNodeInstance('Identifier', tokenStack)
    }

    if (nextToken.type === 'literal') {
      return this.getNodeInstance('Literal', tokenStack)
    }

    if (nextToken.type === 'numeric') {
      return this.getNodeInstance('Literal', tokenStack)
    }

    if (nextToken.type === 'punctuator') {
      if (nextToken.value === '[') {
        return this.getNodeInstance('ArrayExpression', tokenStack)
      }
    }

    if (nextToken.type === 'operator') {
      if (this.binaryOperatorPattern.test(nextToken.value)) {
        return this.getNodeInstance('BinaryExpression', tokenStack)
      }
    }

    console.log('UNUSED TOKEN', nextToken)
    this.syntaxError('Unexpected token', nextToken)
  }

  createVariableDeclaratorNode (tokenStack) {
    return this.getNodeInstance('VariableDeclarator', tokenStack)
  }

  createIdentifierNode (tokenStack) {
    return this.getNodeInstance('Identifier', tokenStack)
  }

  createAssignmentNode (tokenStack) {
    return this.getNodeInstance('AssignmentExpression', tokenStack)
  }

  createCallExpressionNode (tokenStack) {
    return this.getNodeInstance('CallExpression', tokenStack)
  }

  createImportDefaultSpecifierNode (tokenStack) {
    return this.getNodeInstance('ImportDefaultSpecifier', tokenStack)
  }

  createImportSpecifierNode (tokenStack) {
    return this.getNodeInstance('ImportSpecifier', tokenStack)
  }

  lookForward (tokenStack, type, value, index) {
    index = index || 0
    const token = tokenStack[index]
    if (!token) {
      return false
    }

    if (value && token.value !== value) {
      return false
    }

    return token.type === type
  }

  syntaxError (message, token) {
    const lineNum = token && token.loc ? token.loc.start[0] : ''
    const colNum = token && token.loc ? token.loc.start[1] : ''
    const errMessage = lineNum ? `${message} at line ${lineNum} at column ${colNum + 1}` : message
    const err = new SyntaxError(errMessage)
    err.token = token
    err.callStack = this.callStack
    throw err
  }

  getNodeInstance (nodeName, tokenStack) {
    const nextToken = tokenStack[0]
    this.callStack.push(`${nodeName} @ ${nextToken.type} | ${nextToken.value}`)
    const Node = require(`./${nodeName}`)
    const node = new Node(tokenStack, this)
    node.lineNum = nextToken.loc.start[0]
    node.colNum = nextToken.loc.start[1]
    return node
  }

  getPreviousSibling () {
    console.log('PARENT', this.parent)
  }

  getNextValueNodes (tokenStack) {
    let node = this.createNode(tokenStack)
    while (true) {
      const nextToken = tokenStack[0]
      if (!nextToken) {
        break
      }

      if (this.isBinaryOperator(nextToken)) {
        const binaryNode = this.createNode(tokenStack)
        binaryNode.left = node
        node = binaryNode
      } else {
        break
      }
    }

    return node
  }

  isAssignmentOperator (token) {
    return token.type === 'operator' && this.assignmentOperatorPattern.test(token.value)
  }

  isBinaryOperator (token) {
    return token.type === 'operator' && this.binaryOperatorPattern.test(token.value)
  }

  isAllowedToken (child, validTokens, token) {
    if (!validTokens.includes(child.type)) {
      this.syntaxError(`Token ${child.type} not allowed within a ${child.parent.type}`, token)
    }
  }
}

module.exports = FireScriptNode
