const superconf = require('superconf')
const NodeDefinition = require('./NodeDefinition')

class Parser {
  constructor (opts) {
    this.indentionSize = opts.indentionSize || 2
    this.confDir = opts.confDir

    if (!this.confDir) {
      throw new Error('The Parser.confDir parameter must be set!')
    }

    this.nodeDefinition = new NodeDefinition({
      confDir: this.confDir
    })

    this.tokenBuffer = null

    // console.log('DEFINITIONS', this.definitionFile)
    // console.log('DEFINITIONS', this.definition)
  }

  parse (source) {
    this.index = 0
    this.line = 1
    this.column = 1
    this.indention = 0
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
      pattern: /=|\.|\{|\}|:/
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

  /**
   * Parse next token
   *
   * Returns a token object:
   * {
   *   type: 'identifier',
   *   value: 'foo',
   *   line: 1,
   *   column: 1,
   *   index: 0,
   *   length: 3
   * }
   *
   * @method  nextToken
   * @returns {[type]} [description]
   */
  nextToken () {
    if (this.tokenBuffer) {
      const token = this.tokenBuffer
      this.tokenBuffer = null
      return token
    }

    let res = null
    this.parserFuncs.find((fn) => {
      res = fn(this)
      return !!res
    })

    if (!res) {
      if (this.index < this.length) {
        throw new SyntaxError(`Unexpected token at line ${this.line} in column ${this.column} \n\n${this.sourcePreview()}`)
      }

      return null
    }

    return res
  }

  nextNode () {
    const token = this.nextToken()
    return this.resolveToken(token)
  }

  resolveToken (token) {
    if (token === null) {
      return null
    }

    const nodeName = this.nodeDefinition.resolve(token)
    console.log('NODENAME', nodeName)
    const node = this.createNode(nodeName, token)
    console.log('NODE', node)
    return node
  }

  createNode (nodeName, token) {
    if (!token) {
      token = this.nextToken()
    }

    const Node = require(`${this.confDir}nodes/${nodeName}`)
    const node = new Node(this, token)
    return node
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

    if (!match) {
      return index
    }

    this.column += (reg.lastIndex - index)
    return reg.lastIndex
  }

  createToken (type, value, nextIndex) {
    let index = this.index
    let line = this.line
    let column = this.column
    let length = value.length

    this.column += length

    if (type === 'identifier' && this.keyWords.includes(value)) {
      type = 'keyword'
    } else if (type === 'indention') {
      const split = value.split('\n')
      const item = split.pop()
      length = item.length

      this.line += split.length
      this.column = item.length + 1
      line += split.length
      column = 1
      index += value.length - item.length
      this.index = nextIndex

      if (this.indentionSize) {
        if (length % this.indentionSize) {
          this.syntaxError('Unexpected indention')
        }

        value = parseInt(length / this.indentionSize)
      }
    }

    if (type !== 'indention') {
      this.index = this.moveToNextItem(nextIndex)
    }

    return {
      type: type,
      value: value,
      index: index,
      length: length,
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
    const token = this.nextToken()
    // console.log('TOKEN', token, this.index)
    if (token.type === 'identifier') {
      return token
    }

    this.syntaxError('Identifier token expected')
  }

  getIdentifierValue () {
    const token = this.getIdentifier()
    return token.value
  }

  getKeyword () {
    const token = this.nextToken()
    // console.log('TOKEN', token, this.index)
    if (token.type === 'keyword') {
      return token
    }

    this.syntaxError('Keyword token expected')
  }

  getLiteral () {
    const token = this.nextToken()
    // console.log('TOKEN', token, this.index)
    if (token.type === 'literal') {
      return token
    }

    this.syntaxError('Literal token expected')
  }

  getPunctuator () {
    const token = this.nextToken()
    // console.log('TOKEN', token, this.index)
    if (token.type === 'punctuator') {
      return token
    }

    this.syntaxError('Punctuator token expected')
  }

  getOperator () {
    const token = this.nextToken()
    // console.log('TOKEN', token, this.index)
    if (token.type === 'operator') {
      return token
    }

    this.syntaxError('Operator token expected')
  }

  getComment () {
    const token = this.nextToken()
    // console.log('TOKEN', token, this.index)
    if (token.type === 'comment') {
      return token
    }

    this.syntaxError('Comment token expected')
  }

  expect (type, value) {
    const token = this.nextToken()
    this.tokenBuffer = token
    if (!token) {
      return false
    }

    if (value && Array.isArray(value)) {
      return value.indexOf(token.value) >= 0
    } else if (value && value instanceof RegExp) {
      return value.test(token.value)
    } else if (value && token.value !== value) {
      return false
    }

    return Array.isArray(type)
      ? type.some((t) => t === token.type)
      : token.type === type
  }
}

module.exports = Parser
