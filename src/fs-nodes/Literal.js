const FireScriptNode = require('./FireScriptNode')

class Literal extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    const token = tokenStack.shift()
    this.raw = token.value
    this.value = token.value.replace(/(^["'`])|(["'`]$)/g, '')
  }

  toJSON () {
    return {
      type: 'Literal',
      raw: this.raw,
      value: this.value
    }
  }
}

module.exports = Literal
