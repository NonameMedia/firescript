const TokenStack = require('./TokenStack')

class FireSciptTokenizer {
  constructor (opts) {
    opts = opts || {}
    this.setRange = opts.range || false
    this.setLocation = opts.loc || false
    this.keyWords = ['class', 'const', 'export', 'func', 'import', 'let', 'return', 'super', 'var']
    this.punctuatorChars = '[.=(){},+*/-]'
    this.punctators = [
      '.', '=', '(', ')', '{', '}', '[', ']', ','
    ]
    this.operators = [
      '!==', '!=', '!', '%=', '%', '&&', '&=', '&', '**', '*=', '*',
      '++', '+=', '+', '--', '-=', '-', '/=', '/', '<<=', '<<', '<=',
      '<', '===', '==', '=', '>>>=', '>>>', '>>=', '>>', '>=', '>',
      '^=', '^', '|=', '||', '~']
    this.literalPattern = '\'[^]+?\'|true|false|null'
    this.numericPattern = '-?\\d+'

    this.token = new TokenStack()
    this.lineNums = []
  }

  regExpEscape (arr) {
    return arr.map((item) => item.replace(/[\\|\]*+?[()/]/g, (match) => {
      return `\\${match}`
    }))
  }

  tokenize (source) {
    const pattern = [
      `\\n\\s*`,
      `?:\\b(${this.keyWords.join('|')})\\b`,
      `${this.regExpEscape(this.operators).join('|')}`,
      `[${this.regExpEscape(this.punctators).join()}]`,
      `${this.literalPattern}`,
      `${this.numericPattern}`,
      `[a-zA-Z_][a-zA-Z0-9$_-]*`
    ]

    const reg = new RegExp(`(${pattern.join(')|(')})`, 'g')
    this.lineNum = 1
    this.lastEOLIndex = 0
    this.lastIndex = 0

    while (true) {
      const match = reg.exec(source)
      if (!match) {
        break
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
        this.addToken('keyword', match[2])
        continue
      }

      if (match[3] !== undefined) {
        this.addToken('operator', match[3])
        continue
      }

      if (match[4] !== undefined) {
        this.addToken('punctuator', match[4])
        continue
      }

      if (match[5] !== undefined) {
        this.addToken('literal', match[5])
        this.lineNum += this.countLineBreaks(match[5])
        continue
      }

      if (match[6] !== undefined) {
        this.addToken('numeric', match[6])
        continue
      }

      if (match[7] !== undefined) {
        this.addToken('identifier', match[7])
        continue
      }
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
}

module.exports = FireSciptTokenizer