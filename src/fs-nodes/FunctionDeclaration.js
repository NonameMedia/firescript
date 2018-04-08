const FireScriptNode = require('./FireScriptNode')

const ALLOWED_PARAMS = [
  'Identifier',
  'AssignmentPattern',
  'ArrayPattern',
  'ObjectPattern',
  'RestElement'
]

class FunctionDeclaration extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.id = null
    this.async = false
    this.expression = false
    this.generator = false

    let token = tokenStack.next()
    if (token.value === 'async') {
      this.async = true
    } else if (token.value === 'gen') {
      this.generator = true
    } else if (!token.value === 'func') {
      this.syntaxError('Unexpected token', token)
    }

    if (this.async || tokenStack.expect('identifier')) {
      this.id = this.createIdentifierNode(tokenStack)
    }

    this.params = []

    if (tokenStack.expect('punctuator', '(')) {
      tokenStack.goForward()

      while (true) {
        if (tokenStack.expect('punctuator', ')')) {
          tokenStack.goForward()
          break
        }

        if (tokenStack.expect('punctuator', ',')) {
          tokenStack.goForward()
          continue
        }
        const param = this.createFullNode(tokenStack)
        this.isAllowedNode(param, ALLOWED_PARAMS)
        this.params.push(param)
      }
    } else {
      this.syntaxError('Function arguments expected', tokenStack.current())
    }

    this.body = this.createFullNode(tokenStack)
  }

  toJSON () {
    return this.createJSON({
      type: 'FunctionDeclaration',
      id: this.id.toJSON(),
      params: this.params.map((item) => item.toJSON()),
      body: this.body.toJSON(),
      async: this.async,
      expression: this.expression,
      generator: this.generator
    })
  }
}

module.exports = FunctionDeclaration
