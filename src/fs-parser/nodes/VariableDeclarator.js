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
  constructor (parser) {
    super(parser)

    this.fsTyping = null

    if (parser.match('identifier > identifier [in,of]')) {
      this.id = parser.createNode('Identifier')
      return
    }

    if (parser.match('identifier')) {
      if (parser.match('identifier > identifier')) {
        this.fsTyping = parser.createNode('FirescriptTyping')
      }

      this.id = parser.createNode('Identifier')
    } else if (parser.match('punctuator', '[')) {
      this.id = parser.createNode('ArrayPattern')
    } else if (parser.match('punctuator', '{')) {
      this.id = parser.createNode('ObjectPattern')
    } else {
      parser.syntaxError('Unexpected token, identifier expected')
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

    // const node = parser.nextNode(this)
    // if (node.type === 'FirescriptTyping') {
    //   this.fsTyping = node
    //   this.id = parser.nextNode(this)
    // } else {
    //   this.id = node
    // }

    if (parser.match('operator "="')) {
      parser.skipNext()

      this.init = parser.nextNode(this)
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
      //   this.init = parser.nextNode(this)
      //   this.isAllowedNode(this.init, ALLOWED_CHILDS)
      // }
    }
  }

  // isForLoop () {
  //   return (
  //     this.tokenStack.lookForward('identifier', 'in') && this.parent.parent.type === 'ForInStatement'
  //   ) || (
  //     this.tokenStack.lookForward('identifier', 'of') && this.parent.parent.type === 'ForOfStatement'
  //   )
  // }
  //
  // tryObject (tokenStack) {
  //   return tokenStack.expect('indention') &&
  //     tokenStack.lookForward('identifier', null, 1) &&
  //     tokenStack.lookForward('punctuator', ':', 2)
  // }
  //
  // tryArray (tokenStack) {
  //   return tokenStack.expect('indention') &&
  //     tokenStack.lookForward('identifier', null, 1) &&
  //     tokenStack.lookForward('punctuator', ':', 2)
  // }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'VariableDeclarator',
      id: this.id.resolve(ctx),
      init: this.init ? this.init.resolve(ctx) : null,
      fsTyping: this.fsTyping ? this.fsTyping.resolve(ctx) : null
    })
  }
}

module.exports = VariableDeclarator
