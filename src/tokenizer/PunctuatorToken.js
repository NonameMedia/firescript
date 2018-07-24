const Token = require('./Token')
const PATTERN_KEYS = ['indention', 'comment', 'blockComment', 'regexp', 'operator', 'punctuator', 'literal', 'numeric', 'identifier']

class PunctuatorToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'punctuator'
    this.setPattern(PATTERN_KEYS)
  }
}

module.exports = PunctuatorToken
