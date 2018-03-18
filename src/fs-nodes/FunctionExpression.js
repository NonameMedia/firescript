const FireScriptNode = require('./FireScriptNode')

class FunctionExpression extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.id = null
    this.async = false
    this.expression = false
    this.generator = false

    if (this.parent.type !== 'MethodDefinition') {
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
    return {
      type: 'FunctionExpression',
      id: this.id ? this.id.toJSON() : this.id,
      params: this.params.map((item) => item.toJSON()),
      body: this.body.toJSON(),
      async: this.async,
      expression: this.expression,
      generator: this.generator
    }
  }
}

module.exports = FunctionExpression
