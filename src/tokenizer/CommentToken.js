const Token = require('./Token')

class CommentToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'comment'
  }

  parseValue (value) {
    return value.substr(1)
  }
}

module.exports = CommentToken
