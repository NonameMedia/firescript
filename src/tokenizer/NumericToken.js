const Token = require('./Token')

class NumericToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'numeric'
  }
}

module.exports = NumericToken
