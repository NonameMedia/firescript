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
const PATTERN_KEYS = ['indention', 'comment', 'line-comment', 'keyword', 'regexp', 'operator', 'punctuator', 'literal', 'numeric', 'identifier']

class Token {
  constructor (parent, value) {
    parent = parent || {}
    this.reg = PATTERN
    this.patternKeys = PATTERN_KEYS
    this.lastIndex = parent.lastIndex || 0
    this.lineNum = parent.lineNum || 1
    this.lastEOLIndex = parent.lastEOLIndex || 0
    this.value = value
  }

  mapKeys (match) {
    const obj = {}
    for (let i = 1; i < match.length; i++) {
      obj[this.patternKeys[i - 1]] = match[i]
    }

    return obj
  }

  next (source) {
    const stack = []
    if (this.value) {
      stack.push({
        type: this.type,
        value: this.value
      })
    }

    this.reg.lastIndex = this.lastIndex
    const match = this.reg.exec(source)
    this.lastIndex = this.reg.lastIndex
    if (match) {
      if (match[0] === '') {
        throw new Error(`Parser error! Unexpected token in line ${this.lineNum} at column ${this.reg.lastIndex - this.lastEOLIndex}!`)
      }

      const token = this.tokenize(this.mapKeys(match))
      // console.log('TOKEN', token)
      return token ? stack.concat(token.next(source)) : stack
    }

    return stack
  }
}

module.exports = Token
