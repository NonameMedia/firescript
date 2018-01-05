const FireScriptNode = require('./FireScriptNode')

class Literal extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    const token = tokenStack.shift()
    this.raw = token.value

    if (/^["'`]/.test(token.value)) {
      this.value = token.value.slice(1, -1)
    } else if (/^\d+$/.test(token.value)) {
      this.value = parseInt(token.value, 10)
    } else if (/^\d+\.\d+$/.test(token.value)) {
      this.value = parseFloat(token.value, 10)
    } else {
      this.value = token.value
    }
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
