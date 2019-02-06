const constants = require('../utils/constants')
const nodeDefinitions = require('../utils/nodeDefinitions')

class FirescriptNode {
  constructor (tokenStack, parent) {
    this.isBlockScope = false
    this.parent = parent || {
      type: 'None'
    }

    this.indention = tokenStack.getIndention(-1) || 0
    this.callStack = parent ? parent.callStack : []
    this.type = this.constructor.name
    this.indentionSize = tokenStack.indentionSize
    this.tokenStack = tokenStack
    this.firstToken = tokenStack.current()
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

  createCallExpressionNode (tokenStack, callee) {
    return this.getNodeInstance('CallExpression', tokenStack, callee)
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

  createMemberExpressionNode (tokenStack, node) {
    return this.getNodeInstance('MemberExpression', tokenStack, node)
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

  createArrowFunctionExpression (tokenStack) {
    return this.getNodeInstance('ArrowFunctionExpression', tokenStack)
  }

  createFirescriptTypingNode (tokenStack, name) {
    return this.getNodeInstance('FirescriptTyping', tokenStack, name)
  }

  createNullNode (tokenStack) {
    const nextToken = tokenStack.current()
    const typeStr = nextToken ? `${nextToken.type} | ${nextToken.value}` : 'EOF'
    this.callStack.push(`NullNode @ ${typeStr}`)
    const Node = require('./NullNode')
    return new Node(tokenStack, this)
  }

  createSyntaxError (message, token) {
    const lineNum = token && token.loc ? token.loc.start[0] : ''
    const colNum = token && token.loc ? token.loc.start[1] : ''
    const errMessage = lineNum ? `${message} at line ${lineNum} at column ${colNum + 1}` : message
    // const err = new SyntaxError(errMessage)
    // err.token = token || this.tokenStack.current() || this.tokenStack.previous()
    // err.callStack = this.callStack

    const node = this.getNodeInstance('FirescriptSyntaxError', this.tokenStack)
    node.error = errMessage
    node.line = lineNum
    node.token = token

    this.tokenStack.hasError = true
    return node
  }

  syntaxError (message, token) {
    token = token || this.tokenStack.current()
    const lineNum = token && token.loc ? token.loc.start[0] : ''
    const colNum = token && token.loc ? token.loc.start[1] : ''
    const errMessage = lineNum ? `${message} at line ${lineNum} at column ${colNum + 1}` : message
    const err = new SyntaxError(errMessage)
    err.token = token || this.tokenStack.current() || this.tokenStack.previous()
    err.callStack = this.callStack
    err.callTree = this.dump(10)
    err.tryErrors = this.tryErrors
    throw err
  }

  dump (dept, child) {
    const tree = {
      name: this.type,
      value: this.firstToken.value,
      child
    }

    if (this.parent.type !== 'None' && dept > 0) {
      const parentTree = this.parent.dump(dept -= 1, tree)
      return parentTree
    }

    return tree
  }

  getNodeInstance (nodeName, tokenStack, subNode) {
    const nextToken = tokenStack.current()
    if (nextToken) {
      this.callStack.push(`${nodeName} @ ${nextToken.type} | ${nextToken.value}`)
    }
    const Node = require(`./${nodeName}`)
    const node = new Node(tokenStack, this, subNode)
    return node
  }

  getNextNodeType () {
    const nextToken = this.tokenStack.current()
    // this.tokenStack.print()
    if (!nextToken) {
      return 'NullNode'
    }

    const definition = nodeDefinitions.find((mapping, index) => {
      if (!mapping.test(this.tokenStack)) {
        return false
      }

      return (!mapping.scopes && mapping.name) || mapping.scopes[this.type] || mapping.name
    })

    if (definition) {
      if (definition.scopes && definition.scopes[this.type]) {
        return definition.scopes[this.type]
      }

      return definition.name
    }
  }

  createNodeItem (tokenStack) {
    const nodeName = this.getNextNodeType()

    if (nodeName) {
      // console.log('DETECTED DEFINITION', nodeName)
      return this.getNodeInstance(nodeName, tokenStack)
    }

    // -- old shit
    const nextToken = tokenStack.current()
    if (!nextToken) {
      return this.createNullNode(tokenStack)
    }

    if (nextToken.type === 'indention') {
      if (this.indention < nextToken.value) {
        const objectNode = this.tryObjectExpression(tokenStack)
        if (['AssignmentExpression'].includes(this.type)) {
          if (objectNode) {
            return objectNode
          }

          const arrayNode = this.tryArrayExpression(tokenStack)
          if (arrayNode) {
            return arrayNode
          }
        }

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
      tokenStack.print()
      this.syntaxError('Unknown keyword!', nextToken)
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
        if (['FunctionDeclaration', 'FunctionExpression'].includes(this.type)) {
          node = this.getNodeInstance('AssignmentPattern', tokenStack, node)
        } else {
          node = this.getNodeInstance('AssignmentExpression', tokenStack, node)
          node = this.getNodeInstance('ExpressionStatement', tokenStack, node)
        }
      } else if (tokenStack.expect('operator', constants.BINARY_OPERATORS)) {
        node = this.getNodeInstance('BinaryExpression', tokenStack, node)
      } else if (tokenStack.expect('operator', constants.LOGICAL_OPERATORS)) {
        node = this.getNodeInstance('LogicalExpression', tokenStack, node)
      } else if (tokenStack.expect('punctuator', ['.', '['])) {
        node = this.getNodeInstance('MemberExpression', tokenStack, node)
      } else if (tokenStack.expect('operator', constants.UPDATE_OPERATORS)) {
        node = this.getNodeInstance('UpdateExpression', tokenStack, node)
      } else if (tokenStack.expect('punctuator', '(')) {
        const arrowFunctionNode = this.tryArrowFunctionExpression(tokenStack)
        if (arrowFunctionNode) {
          if (node.type === 'Identifier' && node.name === 'async') {
            arrowFunctionNode.async = true
          }

          node = arrowFunctionNode
        } else {
          node = this.getNodeInstance('CallExpression', tokenStack, node)
        }
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
        if (['TaggedTemplateExpression', 'TemplateLiteral', 'MemberExpression'].includes(this.type)) {
          break
        }

        if (node.type === 'Identifier' && ['Program', 'BlockStatement'].includes(this.type)) {
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
      if (child.type === 'Null') {
        this.syntaxError(`Unexpected EOF`, token)
      }

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

  isObjectExpression (tokenStack) {
    return tokenStack.expect('indention') &&
      tokenStack.lookForward([ 'identifier', 'literal' ], null, 1) &&
      tokenStack.lookForward('punctuator', ':', 2)
  }

  isArrayExpression (tokenStack) {
    return tokenStack.expect('indention') &&
      tokenStack.lookForward([ 'identifier', 'literal' ], null, 1) &&
      tokenStack.lookForward('punctuator', ':', 2)
  }

  isOutdented (indention) {
    return this.tokenStack.isIndention('lt', indention || this.indention)
  }

  tryObjectExpression (tokenStack) {
    const curIndex = tokenStack.index
    try {
      return this.createObjectExpressionNode(tokenStack)
    } catch (err) {
      this.tryErrors = this.tryErrors || []
      this.tryErrors.push(['TryObjectExpression', err])
      tokenStack.index = curIndex
      return null
    }
  }

  tryArrayExpression (tokenStack) {
    const curIndex = tokenStack.index
    const stackSize = this.callStack.length
    try {
      return this.createArrayExpressionNode(tokenStack)
    } catch (err) {
      this.tryErrors = this.tryErrors || []
      this.tryErrors.push(['TryArrayExpression', err])
      tokenStack.index = curIndex
      this.callStack.splice(stackSize)
      return null
    }
  }

  tryArrowFunctionExpression (tokenStack) {
    const curIndex = tokenStack.index
    const stackSize = this.callStack.length
    try {
      return this.createArrowFunctionExpression(tokenStack)
    } catch (err) {
      tokenStack.index = curIndex
      this.callStack.splice(stackSize)
      return null
    }
  }

  createJSON (ctx, obj) {
    if (!obj) {
      obj = ctx
      ctx = {}
    }

    if (this.trailingComments) {
      obj.trailingComments = this.trailingComments.map((item) => item.toJSON(ctx))
    }

    if (this.leadingComments) {
      obj.leadingComments = this.leadingComments.map((item) => item.toJSON(ctx))
    }

    if (this.innerComments) {
      obj.innerComments = this.innerComments.map((item) => item.toJSON(ctx))
    }

    if (ctx.setLocation) {
      obj.loc = this.firstToken.loc
    }

    if (ctx.setRange) {
      obj.range = this.firstToken.range
    }

    return obj
  }

  walkScope () {
    let scopeIndention = this.indention
    let scopeEnd = null

    if (this.tokenStack.expect('punctuator', [ '{', '[', '(' ])) {
      const token = this.tokenStack.next()
      scopeEnd = constants.SCOPE_DELIMITER[token.value]
      scopeIndention = null
    }

    if (this.tokenStack.expect('indention')) {
      const token = this.tokenStack.next()
      scopeIndention = token.value
    }

    // console.log('INITIAL INDENTION', scopeIndention)

    return {
      [ Symbol.iterator ]: () => {
        return {
          next: () => {
            if (this.tokenStack.expect('indention')) {
              const token = this.tokenStack.current()
              if (scopeIndention === null) {
                scopeIndention = token.value
              }

              if (token.value === scopeIndention) {
                this.tokenStack.goForward()
                return { done: false, value: this.tokenStack }
              }

              if (!scopeEnd && token.value > scopeIndention) {
                this.syntaxError('Indention error!')
              }

              if (scopeEnd) {
                this.tokenStack.goForward()
                if (this.tokenStack.expect('punctuator', scopeEnd)) {
                  this.tokenStack.goForward()
                } else {
                  this.tokenStack.print()
                  this.syntaxError('Unexpected scope end or invalid indention!')
                }
              }

              return { done: true, value: this.tokenStack }
            } else if (scopeEnd && this.tokenStack.expect('punctuator', ',')) {
              this.tokenStack.goForward()
              if (this.tokenStack.expect('indention')) {
                const token = this.tokenStack.current()
                if (scopeIndention === null) {
                  scopeIndention = token.value
                  this.tokenStack.goForward()
                } else if (token.value === scopeIndention) {
                  this.tokenStack.goForward()
                } else {
                  this.syntaxError('Indention error!')
                }
              }
            } else if (scopeEnd && this.tokenStack.expect('punctuator', scopeEnd)) {
              this.tokenStack.goForward()
              return { done: true, value: this.tokenStack }
            }

            return { done: this.tokenStack.lastItem(), value: this.tokenStack }
          }
        }
      }
    }
  }
}

module.exports = FirescriptNode
