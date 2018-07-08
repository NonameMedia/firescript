const Token = require('./Token')
const LiteralToken = require('./LiteralToken')
// const IdentifierToken = require('./IdentifierToken')

class IdentifierToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'identifier'
  }

  tokenize (match) {
    console.log('IMATCH', match)
    if (match.identifier) {
      const token = new IdentifierToken(this, match.identifier)

      return token
    }

    if (match.literal) {
      const token = new LiteralToken(this, match.literal)

      return token
    }
  }
}

module.exports = IdentifierToken
