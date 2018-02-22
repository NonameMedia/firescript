const FireScriptNode = require('./FireScriptNode')

const ALLOWED_KEYS = [
  'Identifier',
  'Literal'
]

const ALLOWED_VALUES = [
  'Literal',
  'AssignmentPattern',
  'Identifier',
  'BindingPattern',
  'FunctionExpression',
  'null'
]

class Property extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.key = this.createNodeItem(tokenStack)
    this.isAllowedNode(this.key, ALLOWED_KEYS)

    if (!tokenStack.expect('punctuator', ':')) {
      this.syntaxError('Unexpected token', tokenStack.current())
    }

    tokenStack.goForward()
    const property = this.createFullNode(tokenStack)
    this.isAllowedNode(property, ALLOWED_VALUES)
    this.value = property
  }

  toJSON () {
    return {
      type: 'Property',
      key: this.key.toJSON(),
      value: this.value.toJSON(),
      shorthand: false,
      computed: false,
      kind: 'init',
      method: false
    }
  }
}

module.exports = Property
