const Token = require('./Token')

class IdentifierToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'identifier'
  }
}

module.exports = IdentifierToken
