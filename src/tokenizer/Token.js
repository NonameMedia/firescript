const SuperReg = require('superreg')
const constants = require('../utils/constants')

const pattern = [
  `\\n\\s*`,
  constants.COMMENT_PATTERN,
  constants.LINE_COMMENT_PATTERN,
  `?:\\b(${constants.KEYWORDS.join('|')})\\b`,
  constants.REGEXP_PATTERN,
  `${constants.OPERATORS.map(SuperReg.escape).join('|')}`,
  `${constants.PUNCTUATORS.map(SuperReg.escape).join('|')}`,
  constants.LITERAL_PATTERN,
  constants.NUMERIC_PATTERN,
  `[a-zA-Z_][a-zA-Z0-9$_-]*`
]

const PATTERN = new RegExp(`(${pattern.join(')|(')})`, 'g')

class Token {
  constructor (parent) {
    parent = parent || {}
    this.reg = PATTERN
    this.lastIndex = parent.lastIndex || 0
    this.lineNum = parent.lineNum || 1
    this.lastEOLIndex = parent.lastEOLIndex || 0
  }

  next (source) {
    const stack = []
    if (this.type) {
      stack.push({
        type: this.type,
        value: this.value
      })
    }

    const match = this.reg.exec(source)
    if (match) {
      if (match[0] === '') {
        throw new Error(`Parser error! Unexpected token in line ${this.lineNum} at column ${this.reg.lastIndex - this.lastEOLIndex}!`)
      }

      const token = this.tokenize(match)
      return token ? stack.concat(token.next()) : stack
    }
  }
}

module.exports = Token
