const Node = require('./Node')

const ALLOWED_CHILDS = [
  'ThisExpression', 'Identifier', 'Literal',
  'ArrayExpression', 'ObjectExpression', 'FunctionExpression', 'ArrowFunctionExpression', 'ClassExpression',
  'TaggedTemplateExpression', 'MemberExpression', 'Super', 'MetaProperty',
  'NewExpression', 'CallExpression', 'UpdateExpression', 'AwaitExpression', 'UnaryExpression',
  'BinaryExpression', 'LogicalExpression', 'ConditionalExpression',
  'YieldExpression', 'AssignmentExpression', 'SequenceExpression', 'TemplateLiteral'
]

class VariableDeclarator extends Node {
  constructor (parser, token) {
    super(parser, token)

    console.log('VARDCSS', token)

    if (!this.expect('identifier')) {
      this.syntaxError('Unexpected token, identifier expected')
    }

    // TODO support binding patterns
    // if (parser.expect('punctuator', '[')) {
    //   this.id = parser.createNode('ArrayPattern')
    // } else {
    //   if (parser.expect('identifier') && tokenStack.lookForward('identifier') && !this.isForLoop()) {
    //     this.fsTyping = this.createFirescriptTypingNode(tokenStack)
    //   } else {
    //     this.fsTyping = this.createFirescriptTypingNode(tokenStack, 'any')
    //   }
    //
    //
    // }

    const node = parser.nextNode()
    if (node.type === 'FirescriptTyping') {
      this.fsTyping = node
      this.id = parser.nextNode()
    } else {
      this.id = node
    }

    if (parser.match('punctuator "="')) {
      parser.nextNode()

      this.init = parser.nextNode()
      this.isAllowedNode(this.init, ALLOWED_CHILDS)
      // if (parser.expect('indention')) {
      //   if (this.isObjectExpression(tokenStack)) {
      //     this.init = this.createObjectExpressionNode(tokenStack)
      //   // }
      //   // const objectExpressionNode = this.tryObjectExpression(tokenStack)
      //   // if (objectExpressionNode) {
      //   //   this.init = objectExpressionNode
      //   } else {
      //     const arrayExpressionNode = this.tryArrayExpression(tokenStack)
      //     if (arrayExpressionNode) {
      //       this.init = arrayExpressionNode
      //     } else {
      //       this.syntaxError('Unexpected token!', tokenStack.current())
      //     }
      //   }
      // } else {
      //   this.init = this.createFullNode(tokenStack)
      //   this.isAllowedNode(this.init, ALLOWED_CHILDS)
      // }
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

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'VariableDeclarator',
      id: this.id.toJSON(ctx),
      init: this.init ? this.init.toJSON(ctx) : null,
      fsTyping: this.fsTyping ? this.fsTyping.toJSON(ctx) : null
    })
  }
}

module.exports = VariableDeclarator
