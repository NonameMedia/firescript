const FirescriptNode = require('./FirescriptNode')

const ALLOWED_PARAMS = [
  'Identifier',
  'AssignmentPattern',
  'ArrayPattern',
  'ObjectPattern',
  'RestElement'
]

class FunctionDeclaration extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

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
    this.fsParamTypings = []

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

        if (tokenStack.expect('identifier') && tokenStack.lookForward('identifier')) {
          this.fsParamTypings.push(this.createFirescriptTypingNode(tokenStack))
        } else {
          this.fsParamTypings.push(this.createFirescriptTypingNode(tokenStack, 'any'))
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

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'FunctionDeclaration',
      id: this.id.toJSON(ctx),
      params: this.params.map((item) => item.toJSON(ctx)),
      fsParamTypings: this.fsParamTypings.map((item) => item.toJSON(ctx)),
      body: this.body.toJSON(ctx),
      async: this.async,
      expression: this.expression,
      generator: this.generator
    })
  }
}

module.exports = FunctionDeclaration
