class FireSciptTokenizer {
  constructor (opts) {
    opts = opts || {}
    this.setRange = opts.range || false
    this.setLocation = opts.loc || false
    this.keyWords = ['import', 'func', 'class', 'const', 'let', 'var', 'return']

    this.token = []
  }

  tokenize (source) {
    const reg = new RegExp(`(\\n\\s*)|(${this.keyWords.join('|')})|(${this.punctationChars})|(${this.literalPattern})|([a-zA-Z][a-zA-Z0-9$_-]*)`, 'g')
    const token = []
    this.lineNum = 1
    this.lastEOLIndex = 0

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

        this.addToken('indention', indention.length)
        continue
      }

      if (match[2] !== undefined) {
        this.addToken('keyword', match[2])
        continue
      }

      if (match[3] !== undefined) {
        this.addToken('punctation', match[3])
        continue
      }

      if (match[4] !== undefined) {
        this.addToken('literal', match[4])
        continue
      }

      if (match[5] !== undefined) {
        this.addToken('identifier', match[5])
        continue
      }
    }

    return token
  }

  addToken (type, value) {
    const item = {
      type: 'identifier',
      value: value
    }

    if (this.setRange) {
      item.range = [this.lastIndex - value.length, this.lastIndex]
    }

    if (this.setLocation) {
      item.line = [this.lineNum, this.lastIndex - this.lastEOLIndex - value.length + 1]
    }

    this.token.push(item)
  }
}

module.exports = FireSciptTokenizer
