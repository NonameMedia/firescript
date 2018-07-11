const Token = require('./Token')

class IndentionToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'indention'
  }

  parseValue (value) {
    const indention = value.substr(value.lastIndexOf('\n') + 1)
    this.lastEOLIndex = this.reg.lastIndex - value.length
    this.lineNum += this.countLineBreaks(value)
    return indention.length
  }

  countLineBreaks (str) {
    const reg = /\n/g
    let lines = 0

    while (true) {
      if (!reg.exec(str)) {
        break
      }

      lines += 1
    }

    return lines
  }
}

module.exports = IndentionToken
