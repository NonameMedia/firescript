const SuperReg = require('superreg')
const constants = require('../utils/constants')
const FirescriptTokenizer = require('../FirescriptTokenizer')

const PATTERN_KEYS = ['indention', 'comment', 'blockComment', 'keyword', 'regexp', 'numeric', 'operator', 'punctuator', 'literal', 'identifier']

class Token {
  constructor (parent, value) {
    this.parent = parent || {}

    this.rawPattern = {
      indention: `\\n\\s*`,
      comment: constants.COMMENT_PATTERN,
      blockComment: constants.BLOCK_COMMENT_PATTERN,
      keyword: `?:\\b(?<!(?:const|let|var|class|\\.)\\s+)(${constants.KEYWORDS.join('|')})(?!:|\\))\\b`,
      regexp: constants.REGEXP_PATTERN,
      operator: `${constants.OPERATORS.map(SuperReg.escape).join('|')}`,
      punctuator: `${constants.PUNCTUATORS.map(SuperReg.escape).join('|')}`,
      literal: constants.LITERAL_PATTERN,
      numeric: constants.NUMERIC_PATTERN,
      identifier: `[a-zA-Z_][a-zA-Z0-9$_-]*`
    }

    this.lastIndex = this.parent.lastIndex || 0
    this.lastEOLIndex = this.parent.lastEOLIndex || 0
    this.lineNum = this.parent.lineNum || 1
    this.setLocation = this.parent.setLocation
    this.setRange = this.parent.setRange
    this.value = this.parseValue(value)
    this.type = 'None'

    this.setPattern(PATTERN_KEYS)
  }

  setPattern (keys) {
    this.patternKeys = keys
    const pattern = keys.map((key) => {
      return this.rawPattern[key]
    })

    this.reg = new RegExp(`(${pattern.join(')|(')})`, 'g')
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

  previousToken (type, value) {
    return this.expect(type, value, this.parent)
  }

  expect (type, value, token) {
    token = token || this
    if (type && token.type !== type) {
      return false
    }

    if (value && token.value !== value) {
      return false
    }

    return true
  }

  next (source) {
    const stack = []
    if (!this.subTokens && this.value !== undefined) {
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
      token.previous = this
      this.lineNum += this.countLineBreaks(match[1])

      if (token) {
        if (token.subTokens) {
          return stack.concat(token.subTokens, token.next(source))
        }

        return stack.concat(token.next(source))
      }

      return stack
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
        const TemplateToken = require('./TemplateToken')
        const token = new TemplateToken(this, match.literal)
        return token
      } else {
        const LiteralToken = require('./LiteralToken')
        const token = new LiteralToken(this, match.literal)
        return token
      }
    }

    if (match.regexp) {
      const LiteralToken = require('./LiteralToken')
      const token = new LiteralToken(this, match.regexp)

      return token
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

    if (match.numeric) {
      const NumericToken = require('./NumericToken')
      const token = new NumericToken(this, match.numeric)

      return token
    }

    console.log('MATCH', match)
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
    const token = [this.createToken('template', 'literal')]
    match.forEach((m) => {
      if (m.startsWith('${') && m.endsWith('}')) {
        prefixNext = true
        token[token.length - 1].value += '${'
        const subToken = new FirescriptTokenizer()
        subToken.tokenize(m.slice(2, -1))
        subToken.token.forEach((token) => token.push(token.toJSON()))
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

  toJSON () {
    return {
      type: this.type,
      value: this.value
    }
  }
}

module.exports = Token
