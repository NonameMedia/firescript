const Token = require('./Token')

class LiteralToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'literal'
  }

  parseValue (value) {
    this.lineNum += this.countLineBreaks(value)
    return value
  }
}

module.exports = LiteralToken
