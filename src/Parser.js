const superconf = require('superconf')

class Parser {
  constructor (opts) {
    this.indentionSize = opts.indentionSize || 2
    this.definitionFile = opts.definitionFile

    if (!this.definitionFile) {
      throw new Error('A code definition file is required!')
    }

    const conf = superconf('*', {
      files: [this.definitionFile]
    })

    this.definition = conf.definition

    // console.log('DEFINITIONS', this.definitionFile)
    // console.log('DEFINITIONS', this.definition)
  }

  parse (source) {
    this.index = 0
    this.line = 1
    this.column = 1
    this.source = source
    this.length = source.length
    this.keyWords = ['const']

    this.parserFuncs = this.createMatcher([{
      type: 'literal',
      begin: '\'',
      end: '\'',
      escape: '\\'
    }, {
      type: 'identifier',
      pattern: /\w+/
    }, {
      type: 'punctuator',
      pattern: /=|\.|\{|\}/
    }, {
      type: 'operator',
      pattern: /\+|-/
    }, {
      type: 'comment',
      begin: /\/\*/,
      end: /\*\//
    }, {
      type: 'comment',
      pattern: /#.*$/
    }, {
      type: 'indention',
      pattern: /\n\s*/
    }])
  }

  next () {
    let res = null
    this.parserFuncs.find((fn) => {
      res = fn(this)
      return !!res
    })

    if (!res) {
      throw new SyntaxError(`Unexpected token at line ${this.line} in column ${this.column} \n\n${this.sourcePreview()}`)
    }

    return res
  }

  createMatcher (arr) {
    return arr.map((item) => {
      if (item.begin) {
        return function matchRange (self) {
          const begin = new RegExp(item.begin.source || item.begin, 'y')
          begin.lastIndex = self.index
          const end = new RegExp(item.end.source || item.end, 'g')
          if (begin.test(self.source)) {
            let value
            let nextIndex = begin.lastIndex
            end.lastIndex = nextIndex

            while (true) {
              end.test(self.source)
              nextIndex = end.lastIndex
              if (self.source.charAt(nextIndex - 1) === item.escape) {
                continue
              }

              value = self.source.slice(self.index, nextIndex)
              break
            }

            return self.createToken(item.type, value, nextIndex)
          }
        }
      } else {
        return function matchPattern (self) {
          const pattern = item.pattern.source
          const reg = new RegExp(pattern, 'y')
          reg.lastIndex = self.index
          const match = reg.exec(self.source)

          if (match) {
            return self.createToken(item.type, match[0], reg.lastIndex)
          }
        }
      }
    })
  }

  moveToNextItem (index) {
    const reg = /( |\t)+/y
    reg.lastIndex = index
    const match = reg.exec(this.source)

    this.column += (reg.lastIndex - index)
    return match ? reg.lastIndex : index
  }

  createToken (type, value, nextIndex) {
    const index = this.index
    const line = this.line
    const column = this.column

    if (type === 'identifier' && this.keyWords.includes(value)) {
      type = 'keyword'
    }

    this.index = this.moveToNextItem(nextIndex)
    this.column += value.length

    return {
      type: type,
      value: value,
      index: index,
      length: value.length,
      line: line,
      column: column
    }
  }

  sourcePreview () {
    const startLine = Math.max(0, this.line - 3)
    const endLine = Math.max(0, this.line)
    const source = this.source.split('\n')
    const previewArr = source.slice(startLine, endLine)
    return previewArr.map((line, index) => {
      const lineNum = ` ${startLine + index + 1}`.slice(-String(endLine).length)
      return `${lineNum} | ${line}\n`
    }).join('').concat(`${' '.repeat(this.column + String(endLine).length + 2)}^\n`)
  }

  syntaxError (msg) {
    throw new SyntaxError(`${msg} ${this.sourcePreview()}`)
  }

  getIdentifier () {
    const token = this.next()
    // console.log('TOKEN', token, this.index)
    if (token.type === 'identifier') {
      return token
    }

    this.syntaxError('Identifier token expected')
  }

  getKeyword () {
    const token = this.next()
    // console.log('TOKEN', token, this.index)
    if (token.type === 'keyword') {
      return token
    }

    this.syntaxError('Keyword token expected')
  }

  getLiteral () {
    const token = this.next()
    // console.log('TOKEN', token, this.index)
    if (token.type === 'literal') {
      return token
    }

    this.syntaxError('Literal token expected')
  }

  getPunctuator () {
    const token = this.next()
    // console.log('TOKEN', token, this.index)
    if (token.type === 'punctuator') {
      return token
    }

    this.syntaxError('Punctuator token expected')
  }

  getOperator () {
    const token = this.next()
    // console.log('TOKEN', token, this.index)
    if (token.type === 'operator') {
      return token
    }

    this.syntaxError('Operator token expected')
  }

  getComment () {
    const token = this.next()
    // console.log('TOKEN', token, this.index)
    if (token.type === 'comment') {
      return token
    }

    this.syntaxError('Comment token expected')
  }
}

module.exports.Parser = Parser
