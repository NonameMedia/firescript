const Token = require('./Token')

class BlockCommentToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'block-comment'
  }

  parseValue (value) {
    return value.replace(/^\/\*|\*\/$/g, '')
  }
}

module.exports = BlockCommentToken
