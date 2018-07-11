const Token = require('./Token')

class TemplateToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'template'
  }
}

module.exports = TemplateToken
