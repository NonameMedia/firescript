const Token = require('./Token')

class OperatorToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'operator'
  }
}

module.exports = OperatorToken
