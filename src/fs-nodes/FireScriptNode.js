const constants = require('../utils/constants')

class FireScriptNode {
  constructor (tokenStack, parent) {
    this.isBlockScope = false
    this.parent = parent || {
      type: 'None'
    }

    this.childreen = []
    this.indention = tokenStack.getIndention(-1) || 0
    this.callStack = parent ? parent.callStack : []
    this.type = this.constructor.name
    this.indentionSize = 2
  }

  addLeadingComment (comment) {
    if (!this.leadingComments) {
      this.leadingComments = []
    }

    this.leadingComments.unshift(comment)
  }

  addTrailingComment (comment) {
    const lastChild = this.childreen[this.childreen.length - 1]
    if (!lastChild.trailingComments) {
      lastChild.trailingComments = []
    }

    lastChild.trailingComments.push(comment)
  }

  createVariableDeclaratorNode (tokenStack) {
    return this.getNodeInstance('VariableDeclarator', tokenStack)
  }

  createIdentifierNode (tokenStack, name) {
    return this.getNodeInstance('Identifier', tokenStack, name)
  }

  createLiteralNode (tokenStack, name) {
    return this.getNodeInstance('Literal', tokenStack, name)
  }

  createBlockStatementNode (tokenStack) {
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

  createImportNamespaceSpecifierNode (tokenStack) {
    return this.getNodeInstance('ImportNamespaceSpecifier', tokenStack)
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

  createTempalteLiteralNode (tokenStack) {
    return this.getNodeInstance('TemplateLiteral', tokenStack)
  }

  createCatchClauseNode (tokenStack) {
    return this.getNodeInstance('CatchClause', tokenStack)
  }

  createSwitchCaseNode (tokenStack) {
    return this.getNodeInstance('SwitchCase', tokenStack)
  }

  createIfStatementNode (tokenStack, test) {
    return this.getNodeInstance('IfStatement', tokenStack, test)
  }

  createObjectExpressionNode (tokenStack) {
    return this.getNodeInstance('ObjectExpression', tokenStack)
  }

  createArrayExpressionNode (tokenStack) {
    return this.getNodeInstance('ArrayExpression', tokenStack)
  }

  createArrayPatternNode (tokenStack) {
    return this.getNodeInstance('ArrayPattern', tokenStack)
  }

  createExportSpecifierNode (tokenStack) {
    return this.getNodeInstance('ExportSpecifier', tokenStack)
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
    if (nextToken) {
      this.callStack.push(`${nodeName} @ ${nextToken.type} | ${nextToken.value}`)
    }
    const Node = require(`./${nodeName}`)
    const node = new Node(tokenStack, this, subNode)
    if (nodeName !== 'Comment') {
      this.childreen.push(node)
    }
    return node
  }

  createNodeItem (tokenStack) {
    const nextToken = tokenStack.current()
    if (!nextToken) {
      return this.createNullNode(tokenStack)
    }

    if (nextToken.type === 'indention') {
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

    if (nextToken.type === 'comment' || nextToken.type === 'block-comment') {
      const comment = this.getNodeInstance('Comment', tokenStack)
      const node = this.createNodeItem(tokenStack)
      if (node.type === 'Null') {
        this.addTrailingComment(comment)
      } else {
        node.addLeadingComment(comment)
      }
      return node
    }

    if (nextToken.type === 'keyword') {
      if (nextToken.value === 'import') {
        return this.getNodeInstance('ImportDeclaration', tokenStack)
      }

      if (nextToken.value === 'export') {
        if (tokenStack.lookForward('operator', '**', 1)) {
          return this.getNodeInstance('ExportDefaultDeclaration', tokenStack)
        }

        if (tokenStack.lookForward('operator', '*', 1)) {
          return this.getNodeInstance('ExportAllDeclaration', tokenStack)
        }

        return this.getNodeInstance('ExportNamedDeclaration', tokenStack)
      }

      if (nextToken.value === 'async' && tokenStack.lookForward('punctuator', '(')) {
        return this.getNodeInstance('ArrowFunctionExpression', tokenStack)
      }

      if (['func', 'async', 'gen'].includes(nextToken.value)) {
        return this.getNodeInstance('FunctionDeclaration', tokenStack)
      }

      if (nextToken.value === 'class') {
        return this.getNodeInstance(this.isBlockScope ? 'ClassDeclaration' : 'ClassExpression', tokenStack)
      }

      if (['var', 'const', 'let'].includes(nextToken.value)) {
        return this.getNodeInstance('VariableDeclaration', tokenStack)
      }

      if (nextToken.value === 'return') {
        return this.getNodeInstance('ReturnStatement', tokenStack)
      }

      if (nextToken.value === 'await') {
        return this.getNodeInstance('AwaitExpression', tokenStack)
      }

      if (nextToken.value === 'yield') {
        return this.getNodeInstance('YieldExpression', tokenStack)
      }

      if (nextToken.value === 'new') {
        return this.getNodeInstance('NewExpression', tokenStack)
      }

      if (nextToken.value === 'if') {
        return this.getNodeInstance('IfStatement', tokenStack)
      }

      if (nextToken.value === 'break') {
        return this.getNodeInstance('BreakStatement', tokenStack)
      }

      if (nextToken.value === 'continue') {
        return this.getNodeInstance('ContinueStatement', tokenStack)
      }

      if (nextToken.value === 'switch') {
        return this.getNodeInstance('SwitchStatement', tokenStack)
      }

      if (nextToken.value === 'while') {
        return this.getNodeInstance('WhileStatement', tokenStack)
      }

      if (nextToken.value === 'try') {
        return this.getNodeInstance('TryStatement', tokenStack)
      }

      if (nextToken.value === 'do') {
        return this.getNodeInstance('DoWhileStatement', tokenStack)
      }

      if (nextToken.value === 'debugger') {
        return this.getNodeInstance('DebuggerStatement', tokenStack)
      }

      if (nextToken.value === 'for') {
        if (tokenStack.lookForward('identifier', 'in', 2)) {
          return this.getNodeInstance('ForInStatement', tokenStack)
        }

        if (tokenStack.lookForward('identifier', 'of', 2)) {
          return this.getNodeInstance('ForOfStatement', tokenStack)
        }

        return this.getNodeInstance('ForStatement', tokenStack)
      }

      tokenStack.print()
      this.syntaxError('Unknown keyword!', nextToken)
    }

    if (nextToken.type === 'operator') {
      if (constants.UPDATE_OPERATORS.includes(nextToken.value)) {
        return this.getNodeInstance('UpdateExpression', tokenStack)
      }

      if (constants.BINARY_OPERATORS.includes(nextToken.value)) {
        return this.getNodeInstance('BinaryExpression', tokenStack)
      }
    }

    if (nextToken.type === 'identifier') {
      if (nextToken.value === 'this') {
        return this.getNodeInstance('ThisExpression', tokenStack)
      }

      if (nextToken.value === 'super') {
        return this.getNodeInstance('Super', tokenStack)
      }

      return this.getNodeInstance('Identifier', tokenStack)
    }

    if (nextToken.type === 'literal') {
      return this.getNodeInstance('Literal', tokenStack)
    }

    if (nextToken.type === 'template') {
      return this.getNodeInstance('TemplateLiteral', tokenStack)
    }

    if (nextToken.type === 'numeric') {
      return this.getNodeInstance('Literal', tokenStack)
    }

    if (nextToken.type === 'punctuator') {
      if (nextToken.value === '{') {
        return this.getNodeInstance('ObjectExpression', tokenStack)
      }

      if (nextToken.value === '[') {
        return this.getNodeInstance('ArrayExpression', tokenStack)
      }

      if (nextToken.value === '...') {
        if (['FunctionDeclaration', 'FunctionExpression'].includes(this.type)) {
          return this.getNodeInstance('RestElement', tokenStack)
        }

        return this.getNodeInstance('SpreadElement', tokenStack)
      }
    }

    if (tokenStack.expect('punctuator', '(')) {
      tokenStack.goForward()

      const nodeList = []
      while (true) {
        if (tokenStack.expect('punctuator', ')')) {
          tokenStack.goForward()

          if (tokenStack.expect('operator', '=>')) {
            return this.getNodeInstance('ArrowFunctionExpression', tokenStack, nodeList)
          }

          return nodeList.length === 0 ? null : nodeList[0]
        }

        if (tokenStack.expect('punctuator', ',')) {
          tokenStack.goForward()
          continue
        }

        nodeList.push(this.createFullNode(tokenStack))
        // this.syntaxError('Unexpected token, could not resolve grouping syntax!', nextToken)
      }
    }

    if (nextToken.type === 'punctuator' || nextToken.type === 'operator') {
      tokenStack.print()
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
      if (tokenStack.expect('operator', constants.ASSIGNMENT_OPERATORS)) {
        node = this.getNodeInstance('AssignmentExpression', tokenStack, node)
        node = this.getNodeInstance('ExpressionStatement', tokenStack, node)
      } else if (tokenStack.expect('operator', constants.BINARY_OPERATORS)) {
        node = this.getNodeInstance('BinaryExpression', tokenStack, node)
      } else if (tokenStack.expect('punctuator', '.')) {
        node = this.getNodeInstance('MemberExpression', tokenStack, node)
      } else if (tokenStack.expect('punctuator', '[')) {
        node = this.getNodeInstance('MemberExpression', tokenStack, node)
      } else if (tokenStack.expect('operator', constants.UPDATE_OPERATORS)) {
        node = this.getNodeInstance('UpdateExpression', tokenStack, node)
      } else if (tokenStack.expect('punctuator', '(')) {
        node = this.getNodeInstance('CallExpression', tokenStack, node)
      } else if (tokenStack.expect('punctuator', '?') && this.type !== 'ConditionalExpression') {
        node = this.getNodeInstance('ConditionalExpression', tokenStack, node)
        break
      } else if (tokenStack.expect('punctuator', ':')) {
        if (this.type === 'ObjectExpression') {
          node = this.getNodeInstance('Property', tokenStack, node)
          break
        } else if (this.type === 'ArrayExpression') {
          const property = this.getNodeInstance('Property', tokenStack, node)
          node = this.getNodeInstance('ObjectExpression', tokenStack, property)
          break
        }

        break
      } else if (tokenStack.expect('template')) {
        if (['TaggedTemplateExpression', 'TemplateLiteral'].includes(this.type)) {
          break
        }
        if (node.type === 'Identifier') {
          node = this.getNodeInstance('TaggedTemplateExpression', tokenStack, node)
        } else {
          node = this.getNodeInstance('TemplateLiteral', tokenStack, node)
        }
      } else if (tokenStack.isIndention('gte', 0) && (
        tokenStack.lookForward('punctuator', '.', 1)
      )) {
        tokenStack.goForward()
        continue
      } else {
        break
      }
    }

    // console.log('TYPE', this.type)
    if (this.isBlockScope && this.type !== 'Property' && constants.BLOCK_SCOPE_WRAP_EXPRESSIONS.includes(node.type)) {
      node = this.getNodeInstance('ExpressionStatement', tokenStack, node)
    }

    return node
  }

  isAllowedNode (child, validTokens, token) {
    const type = child === null ? 'null' : child.type
    if (!validTokens.includes(type)) {
      this.syntaxError(`Token ${type} not allowed within a ${this.type}`, token)
    }
  }

  isExpressionNode (node) {
    const EXPRESSION_NODES = [
      'ThisExpression',
      'Identifier',
      'Literal',
      'ArrayExpression',
      'ObjectExpression',
      'FunctionExpression',
      'ArrowFunctionExpression',
      'ClassExpression',
      'TaggedTemplateExpression',
      'MemberExpression',
      'Super',
      'MetaProperty',
      'NewExpression',
      'CallExpression',
      'UpdateExpression',
      'AwaitExpression',
      'UnaryExpression',
      'BinaryExpression',
      'LogicalExpression',
      'ConditionalExpression',
      'YieldExpression',
      'AssignmentExpression',
      'SequenceExpression',
      'SpreadElement'
    ]
    return EXPRESSION_NODES.includes(node.type)
  }

  isExpectedNode (expected, actual, token) {
    if (expected && expected !== actual) {
      this.syntaxError(`Unexpected token, ${actual} was given but ${expected} was expected}`, token)
    }
  }

  expectParent (type, tokenStack) {
    if (this.parent.type !== type) {
      this.syntaxError('Unexpected token! elif statement not allowed here', tokenStack.current())
    }
  }

  tryObjectExpression (tokenStack) {
    const curIndex = tokenStack.index
    try {
      return this.createObjectExpressionNode(tokenStack)
    } catch (err) {
      tokenStack.index = curIndex
      return null
    }
  }

  tryArrayExpression (tokenStack) {
    const curIndex = tokenStack.index
    try {
      return this.createArrayExpressionNode(tokenStack)
    } catch (err) {
      tokenStack.index = curIndex
      return null
    }
  }

  createJSON (obj) {
    if (this.trailingComments) {
      obj.trailingComments = this.trailingComments.map((item) => item.toJSON())
    }

    if (this.leadingComments) {
      obj.leadingComments = this.leadingComments.map((item) => item.toJSON())
    }

    return obj
  }
}

module.exports = FireScriptNode
