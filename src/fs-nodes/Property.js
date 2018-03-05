const FireScriptNode = require('./FireScriptNode')

const ALLOWED_KEYS = [
  'Identifier',
  'Literal'
]

const ALLOWED_VALUES = [
  'Literal',
  'AssignmentPattern',
  'Identifier',
  'ObjectExpression',
  'ArrayExpression',
  'FunctionExpression',
  'null'
]

class Property extends FireScriptNode {
  constructor (tokenStack, parent, key) {
    super(parent)
    this.isBlockScope = true

    this.key = key || this.createNodeItem(tokenStack)
    this.isAllowedNode(this.key, ALLOWED_KEYS)

    if (!tokenStack.expect('punctuator', ':')) {
      this.syntaxError('Unexpected token', tokenStack.current())
    }

    tokenStack.goForward()
    if (tokenStack.isIndention('gt', this.indention)) {
      const objectExpression = this.tryObjectExpression(tokenStack)
      if (objectExpression) {
        this.value = objectExpression
      } else {
        const arrayExpression = this.tryArrayExpression(tokenStack)

        if (arrayExpression) {
          this.value = arrayExpression
        } else {
          this.syntaxError('Indention error', tokenStack.current())
        }
      }
    } else {
      const property = this.createFullNode(tokenStack)
      this.value = property
    }

    this.isAllowedNode(this.value, ALLOWED_VALUES)
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
