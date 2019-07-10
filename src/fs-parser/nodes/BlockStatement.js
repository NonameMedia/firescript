const Node = require('./Node')
const constants = require('../../utils/constants')

const ALLOWED_CHILDS = [
  'BlockStatement',
  'BreakStatement',
  'ClassDeclaration',
  'ContinueStatement',
  'DebuggerStatement',
  'DoWhileStatement',
  'EmptyStatement',
  'ExpressionStatement',
  'ForStatement',
  'ForInStatement',
  'ForOfStatement',
  'FunctionDeclaration',
  'IfStatement',
  'LabeledStatement',
  'ReturnStatement',
  'SwitchStatement',
  'ThrowStatement',
  'TryStatement',
  'VariableDeclaration',
  'WhileStatement',
  'WithStatement',
  'FirescriptLogStatement'
]

class BlockStatement extends Node {
  constructor (parser) {
    super(parser)
    this.isBlockScope = true

    this.body = []
    const comments = []

    if (parser.isEOF()) {
      return
    }

    if (!parser.match('indention')) {
      this.syntaxError('Unexpected token, indention expected')
    }

    if (parser.isInnerScope(this.indention)) {
      for (const scope of parser.walkScope()) {
        const nextNode = scope.nextNode(this)
        if (nextNode.type === 'Comment') {
          comments.push(nextNode)
          continue
        }

        if (!nextNode) {
          break
        }

        const child = constants.EXPRESSIONS.includes(nextNode.type)
          ? parser.createNode('ExpressionStatement', nextNode)
          : nextNode

        if (comments.length) {
          child.leadingComments = comments.splice(0, Infinity)
        }

        this.isAllowedNode(child, ALLOWED_CHILDS)
        this.body.push(child)
      }
    }

    if (comments.length) {
      this.body.length === 0
        ? this.innerComments = comments.splice(0, Infinity)
        : this.body[this.body.length - 1].trailingComments = comments.splice(0, Infinity)
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'BlockStatement',
      body: this.body.map((item) => item.resolve(ctx))
    })
  }
}

module.exports = BlockStatement
