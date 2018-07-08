const Token = require('./Token')
// const KeywordToken = require('./KeywordToken')

class KeywordToken extends Token {
  tokenize (match) {
    // if (match[4] !== undefined) {
    //   const token = new KeywordToken()
    //   token.lastIndex = this.lastIndex = 0
    //   token.lineNum = this.lineNum = 1
    //   token.lastEOLIndex = this.lastEOLIndex = 0
    //   return token
    // }
  }
}

module.exports = KeywordToken
