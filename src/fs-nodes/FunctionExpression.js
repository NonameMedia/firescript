const FirescriptNode = require('./FirescriptNode')

const ALLOWED_PARAMS = [
  'Identifier',
  'AssignmentPattern',
  'ArrayPattern',
  'ObjectPattern',
  'RestElement'
]

class FunctionExpression extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    this.id = null
    this.async = false
    this.expression = false
    this.generator = false

    // if (!/^(MethodDefinition|Property)$/.test(this.parent.type)) {
    //   let token = tokenStack.next()
    //   if (token.value === 'async') {
    //     this.async = true
    //   } else if (token.value === 'gen') {
    //     this.generator = true
    //   } else if (!token.value === 'func') {
    //     this.syntaxError('Unexpected token', token)
    //   }
    // }
    if (tokenStack.expect('keyword', 'async')) {
      tokenStack.goForward()
      this.async = true
    } else if (tokenStack.expect('keyword', 'gen')) {
      tokenStack.goForward()
      this.generator = true
    } else if (tokenStack.expect('keyword', 'func')) {
      tokenStack.goForward()
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

    this.body = this.createBlockStatementNode(tokenStack)
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
