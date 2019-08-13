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

      if (parser.isInnerScope(this.indention)) {
        if (parser.match('indention > identifier > punctuator ":"') || parser.match('indention > literal > punctuator ":"')) {
          this.init = parser.createNode('ObjectExpression')
        } else {
          this.init = parser.createNode('ArrayExpression')
        }
      } else {
        this.init = parser.nextNode(this)
      }

      this.isAllowedNode(this.init, ALLOWED_CHILDS)
    }
  }

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
