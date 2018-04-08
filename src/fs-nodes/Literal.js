const FireScriptNode = require('./FireScriptNode')

class Literal extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    const token = tokenStack.next()
    this.raw = token.value

    if (token.type === 'numeric') {
      if (/^\d+$/.test(token.value)) {
        this.value = parseInt(token.value, 10)
      } else if (/^\d+\.\d+$/.test(token.value)) {
        this.value = parseFloat(token.value, 10)
      }
    } else if (/^["'`]/.test(token.value)) {
      this.value = token.value.slice(1, -1)
    } else if (token.value === 'true') {
      this.value = true
    } else if (token.value === 'false') {
      this.value = false
    } else if (token.value === 'null') {
      this.value = null
    } else if (/^\//.test(token.value)) {
      this.value = token.value
      const splitIndex = token.value.lastIndexOf('/')
      this.regex = {
        pattern: token.value.slice(1, splitIndex),
        flags: token.value.slice(splitIndex + 1)
      }
    } else {
      this.value = token.value
    }
  }

  toJSON () {
    return this.createJSON({
      type: 'Literal',
      raw: this.raw,
      value: this.value
    })
  }
}

module.exports = Literal
