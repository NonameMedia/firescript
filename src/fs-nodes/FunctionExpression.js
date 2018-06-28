const FirescriptNode = require('./FirescriptNode')

class FunctionExpression extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    this.id = null
    this.async = false
    this.expression = false
    this.generator = false

    if (!/^(MethodDefinition|Property)$/.test(this.parent.type)) {
      let token = tokenStack.next()
      if (token.value === 'async') {
        this.async = true
      } else if (token.value === 'gen') {
        this.generator = true
      } else if (!token.value === 'func') {
        this.syntaxError('Unexpected token', token)
      }
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

        if (tokenStack.expect('identifier')) {
          this.params.push(this.createFullNode(tokenStack))
          continue
        }

        this.syntaxError('Identifier expected', tokenStack.current())
      }
    } else {
      this.syntaxError('Function arguments expected', tokenStack.current())
    }

    this.body = this.createFullNode(tokenStack)
  }

  parseClassMethod () {

  }

  parseFunctionExpression () {

  }

  toJSON () {
    return this.createJSON({
      type: 'FunctionExpression',
      id: this.id ? this.id.toJSON() : this.id,
      params: this.params.map((item) => item.toJSON()),
      fsParamTypings: this.fsParamTypings.map((item) => item.toJSON()),
      body: this.body.toJSON(),
      async: this.async,
      expression: this.expression,
      generator: this.generator
    })
  }
}

module.exports = FunctionExpression
