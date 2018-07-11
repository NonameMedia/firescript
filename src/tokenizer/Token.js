const SuperReg = require('superreg')
const constants = require('../utils/constants')
const FirescriptTokenizer = require('../FirescriptTokenizer')

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

class Token {
  constructor (parent, value) {
    parent = parent || {}
    this.reg = PATTERN
    this.patternKeys = PATTERN_KEYS
    this.lastIndex = parent.lastIndex || 0
    this.lineNum = parent.lineNum || 1
    this.lastEOLIndex = parent.lastEOLIndex || 0
    this.setLocation = parent.setLocation
    this.setRange = parent.setRange
    this.value = this.parseValue(value)
  }

  parseValue (value) {
    return value
  }

  getTokenClass (tokenName) {
    return require(`./${tokenName}`)
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
    if (this.value !== undefined) {
      stack.push(this.createToken(this.type, this.value))
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

      // const indention = match.indention.substr(match.indention.lastIndexOf('\n') + 1)
      // this.lastEOLIndex = this.reg.lastIndex - match.indention.length
      this.lineNum += this.countLineBreaks(match[1])

      return token ? stack.concat(token.next(source)) : stack
    }

    return stack
  }

  isTemplate (str) {
    return /\$\{[^]+?\}/.test(str)
  }

  tokenize (match) {
    if (match.indention) {
      const IndentionToken = require('./IndentionToken')
      const token = new IndentionToken(this, match.indention)

      return token
    }

    if (match.identifier) {
      const IdentifierToken = require('./IdentifierToken')
      const token = new IdentifierToken(this, match.identifier)

      return token
    }

    if (match.keyword) {
      const KeywordToken = require('./KeywordToken')
      const token = new KeywordToken(this, match.keyword)

      return token
    }

    if (match.literal) {
      if (this.isTemplate(match.literal)) {

      } else {
        const LiteralToken = require('./LiteralToken')
        const token = new LiteralToken(this, match.literal)
        return token
      }
    }

    if (match.punctuator) {
      const PunctuatorToken = require('./PunctuatorToken')
      const token = new PunctuatorToken(this, match.punctuator)

      return token
    }

    if (match.operator) {
      const OperatorToken = require('./OperatorToken')
      const token = new OperatorToken(this, match.operator)

      return token
    }

    if (match.template) {
      const TemplateToken = require('./TemplateToken')
      const token = new TemplateToken(this, match.template)

      return token
    }

    if (match.blockComment) {
      const BlockComment = require('./BlockCommentToken')
      const token = new BlockComment(this, match.blockComment)

      return token
    }

    if (match.comment) {
      const LineComment = require('./CommentToken')
      const token = new LineComment(this, match.comment)

      return token
    }

    console.error('TOKEN', match)
    throw new Error('Unexpected token!')
  }

  createToken (type, value) {
    const token = {
      type,
      value
    }

    const len = typeof value === 'string' ? value.length : value
    if (this.setRange) {
      token.range = [this.lastIndex - len, this.lastIndex]
    }

    if (this.setLocation) {
      const indexEnd = this.lastIndex - this.lastEOLIndex
      const indexStart = indexEnd - len

      token.loc = {
        start: [this.lineNum, indexStart],
        end: [this.lineNum, indexEnd]
      }

      // [this.lineNum, this.lastIndex - this.lastEOLIndex - value.length + 1]
    }

    // this.token.push(token)
    // this.lineNums.push([this.lineNum, this.lastIndex - this.lastEOLIndex - len])
    return token
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

  splitTemplateLiteral (literal) {
    const match = literal.slice(1, -1).split(/(\${[^]+?\})/)
    let prefixNext = false
    const token = []
    match.forEach((m) => {
      if (m.startsWith('${') && m.endsWith('}')) {
        prefixNext = true
        token[token.length - 1].value += '${'
        const subToken = new FirescriptTokenizer()
        subToken.tokenize(m.slice(2, -1))
        subToken.token.forEach((token) => token.push(token))
        return
      }

      token.push(this.createToken('template', prefixNext ? '}' + m : m))
      prefixNext = false
    })

    if (prefixNext) {
      token.push(this.createToken('template', '}'))
    }

    return token
  }
}

module.exports = Token
