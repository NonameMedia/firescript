const SuperReg = require('superreg')
const Token = require('./Token')
const constants = require('../utils/constants')

const pattern = [
  `\\n\\s*`,
  constants.COMMENT_PATTERN,
  constants.BLOCK_COMMENT_PATTERN,
  `?:\\b(${constants.KEYWORDS.join('|')})\\b`,
  constants.REGEXP_PATTERN,
  `${constants.OPERATORS.map(SuperReg.escape).join('|')}`,
  `${constants.PUNCTUATORS.map(SuperReg.escape).join('|')}`,
  constants.LITERAL_PATTERN,
  constants.NUMERIC_PATTERN,
  `[a-zA-Z_][a-zA-Z0-9$_-]*`
]

const PATTERN = new RegExp(`(${pattern.join(')|(')})`, 'g')
const PATTERN_KEYS = ['indention', 'comment', 'blockComment', 'keyword', 'regexp', 'operator', 'punctuator', 'literal', 'numeric', 'identifier']

class IndentionToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'indention'
    this.reg = PATTERN
    this.patternKeys = PATTERN_KEYS
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
