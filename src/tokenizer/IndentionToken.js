const Token = require('./Token')

const PATTERN_KEYS = ['indention', 'comment', 'blockComment', 'keyword', 'regexp', 'operator', 'punctuator', 'literal', 'numeric', 'identifier']

class IndentionToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'indention'
    this.setPattern(PATTERN_KEYS)
  }

  parseValue (value) {
    const indention = value.substr(value.lastIndexOf('\n') + 1)
    this.lastEOLIndex = this.lastIndex - indention.length
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
