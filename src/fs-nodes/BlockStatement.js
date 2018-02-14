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
    super(parent)
    this.isBlockScope = true

    const token = tokenStack.next()

    if (token.type !== 'indention') {
      this.syntaxError('Unexpected token', token)
    }

    this.body = []
    this.indention = token.value

    while (true) {
      const nextToken = tokenStack.current()
      if (!nextToken) {
        break
      }

      if (nextToken.type === 'indention' && nextToken.value < this.indention) {
        break
      }

      const child = this.createFullNode(tokenStack)
      if (!child) {
        break
      }

      this.isAllowedToken(child, ALLOWED_CHILDS, tokenStack.current())
      this.body.push(child)
    }
  }

  toJSON () {
    return {
      type: 'BlockStatement',
      body: this.body.map((item) => item.toJSON())
    }
  }
}

module.exports = BlockStatement
