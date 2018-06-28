const FirescriptNode = require('./FirescriptNode')

const ALLOWED_CHILDS = [
  'ThisExpression', 'Identifier', 'Literal',
  'ArrayExpression', 'ObjectExpression', 'FunctionExpression', 'ArrowFunctionExpression', 'ClassExpression',
  'TaggedTemplateExpression', 'MemberExpression', 'Super', 'MetaProperty',
  'NewExpression', 'CallExpression', 'UpdateExpression', 'AwaitExpression', 'UnaryExpression',
  'BinaryExpression', 'LogicalExpression', 'ConditionalExpression',
  'YieldExpression', 'AssignmentExpression', 'SequenceExpression', 'TemplateLiteral'
]

class VariableDeclarator extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    // TODO support binding patterns
    if (tokenStack.expect('punctuator', '[')) {
      this.id = this.createArrayPatternNode(tokenStack)
    } else {
      if (tokenStack.expect('identifier') && tokenStack.lookForward('identifier') && !this.isForLoop()) {
        this.fsTyping = this.createFirescriptTypingNode(tokenStack)
      } else {
        this.fsTyping = this.createFirescriptTypingNode(tokenStack, 'any')
      }

      this.id = this.createIdentifierNode(tokenStack)
    }

    if (tokenStack.expect('operator', '=')) {
      tokenStack.goForward()

      if (tokenStack.expect('indention')) {
        const objectExpressionNode = this.tryObjectExpression(tokenStack)
        if (objectExpressionNode) {
          this.init = objectExpressionNode
        } else {
          const arrayExpressionNode = this.tryArrayExpression(tokenStack)
          if (arrayExpressionNode) {
            this.init = arrayExpressionNode
          } else {
            this.syntaxError('Unexpected token!', tokenStack.current())
          }
        }
      } else {
        this.init = this.createFullNode(tokenStack)
        this.isAllowedNode(this.init, ALLOWED_CHILDS)
      }
    }
  }

  isForLoop () {
    return (
      this.tokenStack.lookForward('identifier', 'in') && this.parent.parent.type === 'ForInStatement'
    ) || (
      this.tokenStack.lookForward('identifier', 'of') && this.parent.parent.type === 'ForOfStatement'
    )
  }

  tryObject (tokenStack) {
    return tokenStack.expect('indention') &&
      tokenStack.lookForward('identifier', null, 1) &&
      tokenStack.lookForward('punctuator', ':', 2)
  }

  tryArray (tokenStack) {
    return tokenStack.expect('indention') &&
      tokenStack.lookForward('identifier', null, 1) &&
      tokenStack.lookForward('punctuator', ':', 2)
  }

  toJSON () {
    return this.createJSON({
      type: 'VariableDeclarator',
      id: this.id.toJSON(),
      init: this.init ? this.init.toJSON() : null,
      fsTyping: this.fsTyping ? this.fsTyping.toJSON() : null
    })
  }
}

module.exports = VariableDeclarator
