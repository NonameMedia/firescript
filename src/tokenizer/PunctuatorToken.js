const Token = require('./Token')
const SuperReg = require('superreg')
const constants = require('../utils/constants')

const pattern = [
  `\\n\\s*`,
  constants.COMMENT_PATTERN,
  constants.BLOCK_COMMENT_PATTERN,
  constants.REGEXP_PATTERN,
  `${constants.OPERATORS.map(SuperReg.escape).join('|')}`,
  `${constants.PUNCTUATORS.map(SuperReg.escape).join('|')}`,
  constants.LITERAL_PATTERN,
  constants.NUMERIC_PATTERN,
  `[a-zA-Z_][a-zA-Z0-9$_-]*`
]

const PATTERN = new RegExp(`(${pattern.join(')|(')})`, 'g')
const PATTERN_KEYS = ['indention', 'comment', 'blockComment', 'regexp', 'operator', 'punctuator', 'literal', 'numeric', 'identifier']

class PunctuatorToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'punctuator'
    this.reg = PATTERN
    this.patternKeys = PATTERN_KEYS
  }
}

module.exports = PunctuatorToken
