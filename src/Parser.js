const TokenBuffer = require('./TokenBuffer')
const NodeDefinition = require('./NodeDefinition')
const NodeMapping = require('./NodeMapping')

class Parser {
  constructor (opts = {}) {
    this.indentionSize = opts.indentionSize || 2
    this.confDir = opts.confDir

    if (!this.confDir) {
      throw new Error('The Parser.confDir parameter must be set!')
    }

    this.nodeDefinition = new NodeDefinition({
      confDir: this.confDir
    })

    this.nodeMapping = new NodeMapping({
      confDir: this.confDir
    })

    this.tokenBuffer = new TokenBuffer()

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
      type: 'numeric',
      pattern: /(0b[01]+)|(0x[a-f0-9]+)|(0o\d+)/i
    }, {
      type: 'numeric',
      pattern: /\d+(\.\d+)?(e\d+)?/
    }, {
      type: 'literal',
      pattern: /(true|false|null)/i
    }, {
      type: 'comment',
      begin: /\/\*/,
      end: /\*\//
    }, {
      type: 'literal',
      begin: /\//,
      end: /\/[gmsiy]*/,
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
  nextToken (skipBuffer) {
    if (!skipBuffer && this.tokenBuffer.length) {
      return this.tokenBuffer.shift()
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
    return this.resolveToken()
  }

  skipNext () {
    return this.tokenBuffer.shift()
  }

  resolveNodeName () {
    const bufferFillSize = this.nodeDefinition.nodeDefinition.reduce((num, item) => {
      return Math.max(num, item.mapping.length)
    }, 0)

    const tokenBuffer = this.fillBuffer(bufferFillSize)
    return this.nodeDefinition.resolve(tokenBuffer)
  }

  resolveToken () {
    const nodeName = this.resolveNodeName()
    // console.log('NODENAME', nodeName)
    if (this.tokenBuffer.length === 0) {
      return null
    }

    if (!nodeName) {
      this.syntaxError('Unexpected token')
    }

    const node = this.createNode(nodeName)
    // console.log('NODE', node)

    // if (this.match('punctuator > "."')) {
    //   return this.createNode('MemberExpression', node)
    // }

    return node
  }

  createNode (nodeName, token) {
    console.log('CREATE NODE', nodeName, token ? '!!!TOKEN' : '')
    const Node = require(`${this.confDir}nodes/${nodeName}`)
    const node = new Node(this)

    const wrapNodeName = this.nodeMapping.resolve(node, this.tokenBuffer)
    if (!wrapNodeName) {
      return node
    }

    const WrapNode = require(`${this.confDir}nodes/${wrapNodeName}`)
    const wrapNode = new WrapNode(this, node)
    console.log('WRAPNODE', node.type, ' => ', wrapNodeName)

    return wrapNode
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

  sourcePreview (token) {
    const startLine = Math.max(0, token.line - 3)
    const endLine = Math.max(0, token.line)
    const source = this.source.split('\n')
    const previewArr = source.slice(startLine, endLine)
    return previewArr.map((line, index) => {
      const lineNum = ` ${startLine + index + 1}`.slice(-String(endLine).length)
      return `${lineNum} | ${line}\n`
    }).join('').concat(`${' '.repeat(token.column + String(endLine).length + 2)}^\n`)
  }

  syntaxError (msg, token) {
    if (!token) {
      this.fillBuffer(1)
      token = this.tokenBuffer[0]
    }

    throw new SyntaxError(`${msg} at line ${token.line} in column ${token.column}\n${this.sourcePreview(token)}`)
  }

  getIdentifier () {
    const token = this.nextToken()
    // console.log('TOKEN', token, this.index)
    if (token.type === 'identifier') {
      return token
    }

    this.syntaxError('Identifier token expected', token)
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

    this.syntaxError('Keyword token expected', token)
  }

  getLiteral () {
    const token = this.nextToken()
    // console.log('TOKEN', token, this.index)
    if (token.type === 'literal') {
      return token
    }

    this.syntaxError('Literal token expected', token)
  }

  getPunctuator () {
    const token = this.nextToken()
    // console.log('TOKEN', token, this.index)
    if (token.type === 'punctuator') {
      return token
    }

    this.syntaxError('Punctuator token expected', token)
  }

  getOperator () {
    const token = this.nextToken()
    // console.log('TOKEN', token, this.index)
    if (token.type === 'operator') {
      return token
    }

    this.syntaxError('Operator token expected', token)
  }

  getComment () {
    const token = this.nextToken()
    if (token.type === 'comment') {
      return token
    }

    this.syntaxError('Comment token expected', token)
  }

  // expect (type, value) {
  //   const tokenBuffer = this.fillBuffer(1)
  //   const token = tokenBuffer[0]
  //   if (!token) {
  //     return false
  //   }
  //
  //   if (value && Array.isArray(value)) {
  //     return value.indexOf(token.value) >= 0
  //   } else if (value && value instanceof RegExp) {
  //     return value.test(token.value)
  //   } else if (value && token.value !== value) {
  //     return false
  //   }
  //
  //   return Array.isArray(type)
  //     ? type.some((t) => t === token.type)
  //     : token.type === type
  // }

  match (matchString) {
    // const reg = this.parseMatchString(matchString)
    // const matchItem = matchString.split('>').map((match) => {
    //   return match.trim()
    // })

    const matchDefinition = this.nodeDefinition.parse(matchString)

    const tokenBuffer = this.fillBuffer(matchDefinition.mapping.length)
    return matchDefinition.test(tokenBuffer)
  }

  // parseMatchString (matchString) {
  //   const match = matchString.split('>').map((item) => {
  //     const match = item.match(/(\w+)?(?:\s+"(\w+)")?(?:\s+\[(.+)\])?/)
  //     console.log('MATCH', match)
  //     if (match[2]) {
  //       return match[2]
  //     }
  //
  //     if (match[3]) {
  //       return match[3].replace(/,/g, '|')
  //     }
  //
  //     if (match[1] === 'identifier') {
  //       return '\\w+'
  //     }
  //
  //     if (match[1] === 'keyword') {
  //       return this.keyWords.join('|')
  //     }
  //
  //     if (match[1] === 'operator') {
  //
  //     }
  //   }).join(')|()')
  //
  //   return new RegExp(`(${match})`)
  // }

  /**
   * Fills the token buffer with `numItems` items
   *
   * @param  {number} numItems Number of items the buffer should be filled with
   * @return {object} Returns the filled buffer
   */
  fillBuffer (numItems) {
    for (let i = this.tokenBuffer.length; i < numItems; i++) {
      const token = this.nextToken(true)
      if (!token) {
        break
      }

      this.tokenBuffer.push(token)
    }

    return this.tokenBuffer
  }

  /**
   * Returns the position of the next token
   *
   * {
   *   index: {number}
   *   length: {number}
   *   line: {number}
   *   column: {number}
   *   indention: {number}
   * }
   *
   * @return {object} Returns a object
   */
  getPosition () {
    if (this.tokenBuffer.length === 0) {
      this.fillBuffer(1)
    }

    const token = this.tokenBuffer[0]
    return {
      index: token.index,
      length: token.length,
      line: token.line,
      column: token.column,
      indention: token.indention
    }
  }
}

module.exports = Parser
