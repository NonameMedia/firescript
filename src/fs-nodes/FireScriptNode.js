const NODE_GROUPS = {
  'BindingPattern': [

  ]
}
class FireScriptNode {
  constructor (parent) {
    this.parent = parent || null
    this.indention = parent ? parent.indention : 0
    this.callStack = parent ? parent.callStack : []
    this.binaryOperatorPattern = /^[+*/&-]$/
    this.assignmentOperatorPattern = /^[=]$/
    this.type = this.constructor.name
    this.indentionSize = 2
  }

  createNode (tokenStack, expectedNode, noFullNode) {
    const nextToken = tokenStack.current()
    if (!nextToken) {
      return this.createNullNode(tokenStack)
    }

    if (nextToken.type === 'indention') {
      if (this.indention < nextToken.value) {
        this.isExpectedNode(expectedNode, 'BlockStatement', tokenStack.current())
        return this.getNodeInstance('BlockStatement', tokenStack)
      } else {
        tokenStack.goForward()
      }

      return this.createNode(tokenStack)
    }

    if (nextToken.type === 'keyword') {
      if (nextToken.value === 'import') {
        this.isExpectedNode(expectedNode, 'ImportDeclaration', tokenStack.current())
        return this.getNodeInstance('ImportDeclaration', tokenStack)
      }

      if (nextToken.value === 'func') {
        this.isExpectedNode(expectedNode, 'FunctionDeclaration', tokenStack.current())
        return this.getNodeInstance('FunctionDeclaration', tokenStack)
      }

      if (['var', 'const', 'let'].includes(nextToken.value)) {
        this.isExpectedNode(expectedNode, 'VariableDeclaration', tokenStack.current())
        return this.getNodeInstance('VariableDeclaration', tokenStack)
      }

      if (nextToken.value === 'return') {
        this.isExpectedNode(expectedNode, 'ReturnStatement', tokenStack.current())
        return this.getNodeInstance('ReturnStatement', tokenStack)
      }

      if (nextToken.value === 'super') {
        this.isExpectedNode(expectedNode, 'Super', tokenStack.current())
        return this.getNodeInstance('Super', tokenStack)
      }
    }

    if (nextToken.type === 'identifier') {
      // if (this.isExpressionStatement(tokenStack)) {
      //   this.isExpectedNode(expectedNode, 'ExpressionStatement', tokenStack.current())
      //   return this.getNodeInstance('ExpressionStatement', tokenStack)
      // }

      if (tokenStack.lookForward('punctuator', '(', 1)) {
        if (this.type === 'MethodDefinition') {
          this.isExpectedNode(expectedNode, 'FunctionExpression', tokenStack.current())
          return this.getNodeInstance('FunctionExpression', tokenStack)
        }

        this.isExpectedNode(expectedNode, 'ExpressionStatement', tokenStack.current())
        return this.getNodeInstance('ExpressionStatement', tokenStack)
      }

      if (nextToken.value === 'this') {
        this.isExpectedNode(expectedNode, 'ThisExpression', tokenStack.current())
        return this.getNodeInstance('ThisExpression', tokenStack)
      }

      return this.getNodeInstance('Identifier', tokenStack, noFullNode)
    }

    if (nextToken.type === 'literal') {
      this.isExpectedNode(expectedNode, 'Literal', tokenStack.current())
      return this.getNodeInstance('Literal', tokenStack)
    }

    if (nextToken.type === 'numeric') {
      this.isExpectedNode(expectedNode, 'Literal', tokenStack.current())
      return this.getNodeInstance('Literal', tokenStack)
    }

    if (nextToken.type === 'punctuator') {
      if (nextToken.value === '[') {
        this.isExpectedNode(expectedNode, 'ArrayExpression', tokenStack.current())
        return this.getNodeInstance('ArrayExpression', tokenStack)
      }

      if (nextToken.value === '.') {
        console.log('THIS TOKEN', this.type)
        return null
      }
    }

    if (nextToken.type === 'operator') {
      if (this.binaryOperatorPattern.test(nextToken.value)) {
        this.isExpectedNode(expectedNode, 'BinaryExpression', tokenStack.current())
        return this.getNodeInstance('BinaryExpression', tokenStack)
      }
    }

    console.log('UNUSED', nextToken)
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

  createPropertyNode (tokenStack) {
    return this.getNodeInstance('Property', tokenStack)
  }

  createClassDeclarationNode (tokenStack) {
    return this.getNodeInstance('ClassDeclaration', tokenStack)
  }

  createClassBodyNode (tokenStack) {
    return this.getNodeInstance('ClassBody', tokenStack)
  }

  createMethodDefinitionNode (tokenStack) {
    return this.getNodeInstance('MethodDefinition', tokenStack)
  }

  createMemberExpressionNode (tokenStack) {
    return this.getNodeInstance('MemberExpression', tokenStack)
  }

  createNullNode (tokenStack) {
    const nextToken = tokenStack.current()
    const typeStr = nextToken ? `${nextToken.type} | ${nextToken.value}` : 'EOF'
    this.callStack.push(`NullNode @ ${typeStr}`)
    const Node = require('./NullNode')
    return new Node(tokenStack, this)
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

  getNodeInstance (nodeName, tokenStack, subNode) {
    const nextToken = tokenStack.current()
    this.callStack.push(`${nodeName} @ ${nextToken.type} | ${nextToken.value}`)
    const Node = require(`./${nodeName}`)
    const node = new Node(tokenStack, this, subNode)
    return node
  }

  createFullNode (nodeName, tokenStack, subNode) {
    const node = this.getNodeInstance(nodeName, tokenStack, subNode)
    console.log('CREATE FULL', node.type)
    if (tokenStack.expect('operator', '=')) {
      console.log('========')
    }

    if (tokenStack.expect('punctuator', '.')) {
      return this.createFullNode('MemberExpression', tokenStack, node)
    }

    return node
  }

  getPreviousSibling () {
    console.log('PARENT', this.parent)
  }

  getNextValueNodes (tokenStack) {
    let node = this.createNode(tokenStack)
    while (true) {
      const nextToken = tokenStack.current()
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
    const type = child === null ? 'null' : child.type
    if (!validTokens.includes(type)) {
      this.syntaxError(`Token ${type} not allowed within a ${child.parent.type}`, token)
    }
  }

  isExpectedNode (expected, actual, token) {
    if (expected && expected !== actual) {
      this.syntaxError(`Unexpected token, ${actual} was given but ${expected} was expected}`, token)
    }
  }

  isExpressionStatement (tokenStack) {
    console.log('TTT', this.type)
    if (this.type === 'ExpressionStatement') {
      return false
    }
    for (let i = tokenStack.index; i < tokenStack.length; i++) {
      const token = tokenStack[i]
      console.log('I', i)
      if (token.type === 'identifier') {
        continue
      }

      if (token.type === 'punctuator' && token.value === '.') {
        continue
      }

      if (token.type === 'operator' && token.value === '=') {
        console.log('YES')
        return true
      }

      break
    }

    return false
  }
}

module.exports = FireScriptNode
