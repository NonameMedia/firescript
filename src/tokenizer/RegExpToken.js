const Token = require('./Token')

class RegExpToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'literal'
  }

  parseValue (value) {
    this.lineNum += this.countLineBreaks(value)
    return value
  }
}

module.exports = RegExpToken
