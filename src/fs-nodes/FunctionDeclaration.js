const FireScriptNode = require('./FireScriptNode')

class FunctionDeclaration extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.async = false
    this.expression = false
    this.generator = false

    let token = tokenStack.next()
    if (!token.value === 'func') {
      this.syntaxError('Unexpected token', token)
    }

    this.id = this.createIdentifierNode(tokenStack)
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
          this.params.push(this.createNode(tokenStack))
          continue
        }

        this.syntaxError('Identifier expected', tokenStack.current())
      }
    } else {
      this.syntaxError('Function arguments expected', tokenStack.current())
    }

    this.body = this.createNode(tokenStack)
  }

  toJSON () {
    return {
      type: 'FunctionDeclaration',
      id: this.id.toJSON(),
      params: this.params.map((item) => item.toJSON()),
      body: this.body.toJSON(),
      async: this.async,
      expression: this.expression,
      generator: this.generator
    }
  }
}

module.exports = FunctionDeclaration
