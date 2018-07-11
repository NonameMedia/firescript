const IndentionToken = require('./tokenizer/IndentionToken')
const Token = require('./tokenizer/Token')
const TokenStack = require('./TokenStack')
const constants = require('./utils/constants')

class FireSciptTokenizer {
  constructor (opts) {
    opts = opts || {}
    this.setRange = opts.range || false
    this.setLocation = opts.loc || false
    this.keyWords = constants.KEYWORDS
    this.punctators = constants.PUNCTUATORS
    this.operators = constants.OPERATORS
    this.regExpPattern = '\\/.+?\\/(?:[imsy]+)?'
    this.literalPattern = '(?:\'[^]*?(?:\\$\\{[^]+?\\}[^]*?)*?\')|"[^]+?"|true|false|null' // eslint-disable-line no-template-curly-in-string
    this.numericPattern = '-?\\d+'
    this.commentPattern = '#.*'
    this.lineCommentPattern = '\\/\\*[^]*?\\*\\/'

    this.token = new TokenStack()
    this.lineNums = []
  }

  regExpEscape (arr) {
    return arr.map((item) => item.replace(/[.\\|\]*+?[(){}^$/]/g, (match) => {
      return `\\${match}`
    }))
  }

  tokenizeSkip (source) {
    this.source = source

    const pattern = [
      `\\n\\s*`,
      this.commentPattern,
      this.lineCommentPattern,
      `?:\\b(${this.keyWords.join('|')})\\b`,
      this.regExpPattern,
      `${this.regExpEscape(this.operators).join('|')}`,
      `${this.regExpEscape(this.punctators).join('|')}`,
      `${this.literalPattern}`,
      `${this.numericPattern}`,
      `[a-zA-Z_][a-zA-Z0-9$_-]*`
    ]

    const reg = new RegExp(`(${pattern.join(')|(')})`, 'g')
    // console.log('REG', reg)
    this.lineNum = 1
    this.lastEOLIndex = 0
    this.lastIndex = 0

    while (true) {
      const match = reg.exec(source)
      if (!match) {
        break
      }

      if (match[0] === '') {
        throw new Error('Parser error! Unmatched item')
      }

      this.lastIndex = reg.lastIndex

      // console.log(match)
      if (match[1] !== undefined) {
        const indention = match[1].substr(match[1].lastIndexOf('\n') + 1)
        this.lastEOLIndex = reg.lastIndex - indention.length
        this.lineNum += this.countLineBreaks(match[1])

        this.addToken('indention', indention.length)
        continue
      }

      if (match[2] !== undefined) {
        this.addToken('comment', match[2].substr(1))
        continue
      }

      if (match[3] !== undefined) {
        this.addToken('block-comment', match[3].slice(2, -2))
        continue
      }

      if (match[4] !== undefined) {
        if (this.handleAsKeyword(match[4])) {
          this.addToken('keyword', match[4])
        } else {
          this.addToken('identifier', match[4])
        }
        continue
      }

      if (match[5] !== undefined) {
        this.addToken('literal', match[4])
        continue
      }

      if (match[6] !== undefined) {
        this.addToken('operator', match[6])
        continue
      }

      if (match[7] !== undefined) {
        this.addToken('punctuator', match[7])
        continue
      }

      if (match[8] !== undefined) {
        if (this.isTemplate(match[8])) {
          this.splitTemplateLiteral(match[8])
        } else {
          this.addToken('literal', match[8])
          this.lineNum += this.countLineBreaks(match[8])
        }

        continue
      }

      if (match[9] !== undefined) {
        this.addToken('numeric', match[9])
        continue
      }

      if (match[10] !== undefined) {
        if (this.lookBack('identifier')) {
          const prev = this.getPrev()
          if (['typeof', 'delete', 'void'].includes(prev.value)) {
            prev.type = 'operator'
          }
        }
        this.addToken('identifier', match[10])
        continue
      }

      throw new Error('Parser error! Unexpected token')
    }

    return this.token
  }

  addToken (type, value) {
    const item = {
      type,
      value
    }

    const len = typeof value === 'string' ? value.length : value
    if (this.setRange) {
      item.range = [this.lastIndex - len, this.lastIndex]
    }

    if (this.setLocation) {
      const indexEnd = this.lastIndex - this.lastEOLIndex
      const indexStart = indexEnd - len

      item.loc = {
        start: [this.lineNum, indexStart],
        end: [this.lineNum, indexEnd]
      }

      // [this.lineNum, this.lastIndex - this.lastEOLIndex - value.length + 1]
    }

    this.token.push(item)
    this.lineNums.push([this.lineNum, this.lastIndex - this.lastEOLIndex - len])
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

  lookBackInLine (type, value) {
    for (let i = this.token.length - 1; i > -1; i--) {
      const token = this.token[i]
      if (token.type === 'indention') {
        return false
      }

      if (token.type === type && token.value === value) {
        return true
      }
    }

    return false
  }

  lookBack (type, value, numItems) {
    numItems = numItems || 0
    const token = this.token[this.token.length - 1 - numItems]
    if (!token) {
      return false
    }

    if (token.type === type && (value === undefined || token.value === value)) {
      return true
    }

    return false
  }

  getPrev (numItems) {
    numItems = numItems || 0
    return this.token[this.token.length - 1 - numItems]
  }

  handleAsKeyword (keyWord) {
    if (this.token.length < 1) return true

    if (keyWord === 'extends') {
      return this.lookBackInLine('keyword', 'class')
    }

    if (keyWord === 'default' && this.lookBack('keyword', 'export', 1)) {
      return false
    }

    if (keyWord === 'new') return true

    const lastToken = this.token[this.token.length - 1]
    if (lastToken.type === 'indention') {
      return true
    }

    if (keyWord === 'async') {
      return this.lookBack('operator', '=>')
    }

    if (['class', 'var', 'let', 'const', 'func', 'gen', 'async'].includes(keyWord) &&
      (this.lookBack('keyword', 'export') ||
      this.lookBack('operator', '='))) {
      return true
    }

    if (['var', 'let', 'const'].includes(keyWord) && this.lookBack('keyword', 'for')) {
      return true
    }

    return false
  }

  isTemplate (str) {
    return /\$\{[^]+?\}/.test(str)
  }

  splitTemplateLiteral (literal) {
    const match = literal.slice(1, -1).split(/(\${[^]+?\})/)
    let prefixNext = false
    match.forEach((m) => {
      if (m.startsWith('${') && m.endsWith('}')) {
        prefixNext = true
        this.token[this.token.length - 1].value += '${'
        const subToken = new FireSciptTokenizer()
        subToken.tokenize(m.slice(2, -1))
        subToken.token.forEach((token) => this.token.push(token))
        return
      }

      this.addToken('template', prefixNext ? '}' + m : m)
      prefixNext = false
    })

    if (prefixNext) {
      this.addToken('template', '}')
    }
  }

  tokenize (source) {
    const opts = {
      setRange: this.setRange,
      setLocation: this.setLocation
    }

    const token = new Token(opts)
    const stack = token.next(source)
    return new TokenStack(stack)
  }
}

module.exports = FireSciptTokenizer
