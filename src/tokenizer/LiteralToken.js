const Token = require('./Token')
const IdentifierToken = require('./IdentifierToken')
const IndentionToken = require('./IndentionToken')

class LiteralToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'literal'
  }

  tokenize (match) {
    console.log('IMATCH', match)
    if (match.indention) {
      const token = new IndentionToken(this, match.indention)

      return token
    }

    if (match.identifier) {
      const token = new IdentifierToken(this, match.identifier)

      return token
    }
  }
}

module.exports = LiteralToken
