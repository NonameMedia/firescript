const Token = require('./Token')

class PunctuatorToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'punctuator'
  }
}

module.exports = PunctuatorToken
