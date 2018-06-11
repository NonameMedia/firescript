const FireScriptNode = require('./FireScriptNode')

class ArrowFunctionExpression extends FireScriptNode {
  constructor (tokenStack, parent, params) {
    super(tokenStack, parent)

    this.id = null
    this.async = false
    this.expression = false
    this.generator = false
    this.params = params || []

    if (tokenStack.expect('keyword', 'async')) {
      this.async = true
      tokenStack.goForward()
    }

    if (!params) {
      console.log('PARAMS')
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
            this.params.push(this.createNodeItem(tokenStack))
            continue
          }

          this.syntaxError('Identifier expected', tokenStack.current())
        }
      } else {
        this.syntaxError('Function arguments expected', tokenStack.current())
      }
    }

    if (!tokenStack.expect('operator', '=>')) {
      this.syntaxError('Unexpected token', tokenStack.current())
    }

    tokenStack.goForward()

    this.body = this.createBlockStatementNode(tokenStack)
  }

  toJSON () {
    return this.createJSON({
      type: 'ArrowFunctionExpression',
      id: null,
      params: this.params.map((item) => item.toJSON()),
      body: this.body.toJSON(),
      async: this.async,
      expression: this.expression,
      generator: this.generator
    })
  }
}

module.exports = ArrowFunctionExpression
