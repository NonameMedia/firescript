const Token = require('./Token')

class KeywordToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'keyword'
  }
}

module.exports = KeywordToken
