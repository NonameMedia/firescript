const BINARY_OPERATORS = ['instanceof',
  'in', '+', '-', '*', '/', '%', '**',
  '|', '^', '&', '==', '!=', '===', '!==',
  '<', '>', '<=', '<<', '>>', '>>>']
const UPDATE_OPERATORS = ['++', '--']

class FireScriptNode {
  constructor (parent) {
    this.isBlockScope = false
    this.parent = parent || {
      type: 'None'
    }
    this.indention = parent ? parent.indention : 0
    this.callStack = parent ? parent.callStack : []
    this.binaryOperatorPattern = /^[+*/&-]$/
    this.assignmentOperatorPattern = /^[=]$/
    this.updateOperatorPattern = /^(\+\+|--)$/
    this.type = this.constructor.name
    this.indentionSize = 2
  }

  createVariableDeclaratorNode (tokenStack) {
    return this.getNodeInstance('VariableDeclarator', tokenStack)
  }

  createIdentifierNode (tokenStack) {
    return this.getNodeInstance('Identifier', tokenStack)
  }

  createBlockStatement (tokenStack) {
    return this.getNodeInstance('BlockStatement', tokenStack)
  }

  createAssignmentExpressionNode (tokenStack, left) {
    return this.getNodeInstance('AssignmentExpression', tokenStack, left)
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

  createFunctionExpressionNode (tokenStack) {
    return this.getNodeInstance('FunctionExpression', tokenStack)
  }

  createVariableDeclarationNode (tokenStack, kind) {
    return this.getNodeInstance('VariableDeclaration', tokenStack, kind)
  }

  createTemplateElementNode (tokenStack) {
    return this.getNodeInstance('TemplateElement', tokenStack)
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

  createNodeItem (tokenStack) {
    const nextToken = tokenStack.current()
    if (!nextToken) {
      return this.createNullNode(tokenStack)
    }

    if (nextToken.type === 'indention') {
      // console.log('INDENTION', this.indention, nextToken.value)
      if (this.indention < nextToken.value) {
        // this.isExpectedNode(expectedNode, 'BlockStatement', tokenStack.current())
        return this.getNodeInstance('BlockStatement', tokenStack)
      } else if (this.indention > nextToken.value) {
        tokenStack.goForward()
        return this.createNullNode(tokenStack)
      } else {
        tokenStack.goForward()
      }

      return this.createNodeItem(tokenStack)
    }

    if (nextToken.type === 'keyword') {
      if (nextToken.value === 'import') {
        // this.isExpectedNode(expectedNode, 'ImportDeclaration', tokenStack.current())
        return this.getNodeInstance('ImportDeclaration', tokenStack)
      }

      if (nextToken.value === 'func') {
        // this.isExpectedNode(expectedNode, 'FunctionDeclaration', tokenStack.current())
        return this.getNodeInstance('FunctionDeclaration', tokenStack)
      }

      if (nextToken.value === 'class') {
        return this.getNodeInstance(this.isBlockScope ? 'ClassDeclaration' : 'ClassExpression', tokenStack)
      }

      if (['var', 'const', 'let'].includes(nextToken.value)) {
        // this.isExpectedNode(expectedNode, 'VariableDeclaration', tokenStack.current())
        return this.getNodeInstance('VariableDeclaration', tokenStack)
      }

      if (nextToken.value === 'return') {
        // this.isExpectedNode(expectedNode, 'ReturnStatement', tokenStack.current())
        return this.getNodeInstance('ReturnStatement', tokenStack)
      }

      if (nextToken.value === 'super') {
        // this.isExpectedNode(expectedNode, 'Super', tokenStack.current())
        return this.getNodeInstance('Super', tokenStack)
      }

      if (nextToken.value === 'new') {
        return this.getNodeInstance('NewExpression', tokenStack)
      }

      if (nextToken.value === 'if') {
        return this.getNodeInstance('IfStatement', tokenStack)
      }

      tokenStack.print()
      this.syntaxError('Unexpected keyword!', nextToken)
    }

    if (nextToken.type === 'operator') {
      if (UPDATE_OPERATORS.includes(nextToken.value)) {
        return this.getNodeInstance('UpdateExpression', tokenStack)
      }

      if (BINARY_OPERATORS.includes(nextToken.value)) {
        return this.getNodeInstance('BinaryExpression', tokenStack)
      }
    }

    if (nextToken.type === 'identifier') {
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

    if (nextToken.type === 'punctuator' || nextToken.type === 'operator') {
      console.log('BÄM', nextToken)
      this.syntaxError('Unexpected token, could not create node item!', nextToken)
    }
  }

  createFullNode (tokenStack) {
    let node
    node = this.createNodeItem(tokenStack)

    if (node.type === 'Null') {
      return node
    }

    while (true) {
      if (tokenStack.expect('operator', '=')) {
        node = this.getNodeInstance('AssignmentExpression', tokenStack, node)
        node = this.getNodeInstance('ExpressionStatement', tokenStack, node)
      } else if (tokenStack.expect('operator', BINARY_OPERATORS)) {
        node = this.getNodeInstance('BinaryExpression', tokenStack, node)
      } else if (tokenStack.expect('punctuator', '.')) {
        node = this.getNodeInstance('MemberExpression', tokenStack, node)
      } else if (tokenStack.expect('operator', UPDATE_OPERATORS)) {
        node = this.getNodeInstance('UpdateExpression', tokenStack, node)
      } else if (tokenStack.expect('punctuator', '(')) {
        node = this.getNodeInstance('CallExpression', tokenStack, node)
        break
      } else {
        break
      }
    }

    if (this.isBlockScope && ['UpdateExpression', 'CallExpression'].includes(node.type)) {
      node = this.getNodeInstance('ExpressionStatement', tokenStack, node)
    }

    return node
  }

  isAllowedToken (child, validTokens, token) {
    const type = child === null ? 'null' : child.type
    if (!validTokens.includes(type)) {
      this.syntaxError(`Token ${type} not allowed within a ${this.type}`, token)
    }
  }

  isExpectedNode (expected, actual, token) {
    if (expected && expected !== actual) {
      this.syntaxError(`Unexpected token, ${actual} was given but ${expected} was expected}`, token)
    }
  }
}

module.exports = FireScriptNode
