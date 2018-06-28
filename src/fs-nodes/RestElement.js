const FirescriptNode = require('./FirescriptNode')

const ALLOWED_CHILDS = [
  'Identifier',
  'ArrayPattern',
  'ObjectPattern'
]

class RestElement extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

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
