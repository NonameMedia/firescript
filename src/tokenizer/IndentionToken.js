const Token = require('./Token')
const KeywordToken = require('./KeywordToken')
const IdentifierToken = require('./IdentifierToken')

class IndentionToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'indention'
  }

  tokenize (match) {
    if (match.keyword) {
      const token = new KeywordToken(this, match.keyword)

      return token
    }

    if (match.identifier) {
      const token = new IdentifierToken(this, match.identifier)

      return token
    }
  }
}

module.exports = IndentionToken
