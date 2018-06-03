const FireScriptNode = require('./FireScriptNode')

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
  'WithStatement'
]

class BlockStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)
    this.isBlockScope = true

    const token = tokenStack.next()

    if (token.type !== 'indention') {
      this.syntaxError('Unexpected token', token)
    }

    this.body = []

    while (true) {
      const nextToken = tokenStack.current()
      if (!nextToken) {
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
      if (!child || child.type === 'Null') {
        break
      }

      this.isAllowedNode(child, ALLOWED_CHILDS, tokenStack.current())
      this.body.push(child)
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
