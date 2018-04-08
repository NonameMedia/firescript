const FireScriptNode = require('./FireScriptNode')

const ALLOWED_CHILDS = [
  'Identifier',
  'ArrayPattern',
  'ObjectPattern'
]

class RestElement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    if (!tokenStack.expect('punctuator', '...')) {
      this.syntaxError('Unexpected token! RestElement expected')
    }

    tokenStack.goForward()

    this.argument = this.createFullNode(tokenStack)
    this.isAllowedNode(this.argument, ALLOWED_CHILDS)
  }

  toJSON () {
    return this.createJSON({
      type: 'RestElement',
      argument: this.argument.toJSON()
    })
  }
}

module.exports = RestElement
