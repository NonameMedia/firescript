const Token = require('./Token')
const KeywordToken = require('./KeywordToken')

class IndentionToken extends Token {
  tokenize (match) {
    if (match[4] !== undefined) {
      const token = new KeywordToken(this)

      return token
    }
  }
}

module.exports = IndentionToken
