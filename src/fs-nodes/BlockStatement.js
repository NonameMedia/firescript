const FirescriptNode = require('./FirescriptNode')

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

class BlockStatement extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)
    this.isBlockScope = true

    const token = tokenStack.next()
    this.body = []
    const comments = []

    if (token === null) {
      return
    }

    if (token.type !== 'indention') {
      this.syntaxError('Unexpected token', token)
    }

    if (token.value <= this.indention) {
      // empty block, skipping
      return
    }

    while (true) {
      const nextToken = tokenStack.current()
      if (!nextToken) {
        break
      }

      if (this.isOutdented()) {
        break
      }

      if (tokenStack.isIndention('lt', this.indention)) {
        break
      }

      if (tokenStack.isIndention('eq', this.indention)) {
        tokenStack.goForward()
        break
      }

      if (tokenStack.isIndention('gt', this.indention)) {
        tokenStack.goForward()
        continue
      }

      const child = this.createFullNode(tokenStack)
      if (child.type === 'Comment') {
        comments.push(child)
        continue
      }

      if (!child || child.type === 'Null') {
        break
      }

      if (comments.length) {
        child.leadingComments = comments.splice(0, Infinity)
      }

      this.isAllowedNode(child, ALLOWED_CHILDS, tokenStack.current())
      this.body.push(child)
    }

    if (comments.length) {
      this.body.length === 0
        ? this.innerComments = comments.splice(0, Infinity)
        : this.body[this.body.length - 1].trailingComments = comments.splice(0, Infinity)
    }
  }

  toJSON () {
    return this.createJSON({
      type: 'BlockStatement',
      body: this.body.map((item) => item.toJSON())
    })
  }
}

module.exports = BlockStatement
