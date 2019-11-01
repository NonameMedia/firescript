const TokenBuffer = require('./TokenBuffer')
const NodeDefinition = require('./NodeDefinition')
const NodeMapping = require('./NodeMapping')
const FSError = require('./FSError').FSError

class Parser {
  constructor (opts = {}) {
    this.indentionSize = opts.indentionSize || 2
    this.confDir = opts.confDir
    this.matcherConf = opts.matcher
    this.keyWords = opts.keyWords
    this.scopeDelimiter = opts.scopeDelimiter
    this.filename = opts.filename || null

    if (!this.confDir) {
      throw new Error('The Parser.confDir parameter must be set!')
    }

    if (!this.matcherConf) {
      throw new Error('The Parser.matcher parameter must be set!')
    }

    if (!this.keyWords) {
      throw new Error('The Parser.keyWords parameter must be set!')
    }

    if (!this.scopeDelimiter) {
      throw new Error('The Parser.scopeDelimiter parameter must be set!')
    }

    this.nodeDefinition = new NodeDefinition({
      confDir: this.confDir
    })

    this.nodeMapping = new NodeMapping({
      confDir: this.confDir
    })

    this.tokenBuffer = new TokenBuffer()
  }

  parse (source, skipBuffer) {
    this.index = 0
    this.line = 1
    this.column = 1
    this.indention = 0
    this.source = source
    this.length = source.length
    this.lineEnd = 0
    this.columnEnd = 0

    this.parserFuncs = this.createMatcher(this.matcherConf)
    if (!skipBuffer) {
      this.fillBuffer()
    }
  }

  tokenize (source) {
    if (source) {
      this.parse(source)
    } else if (this.tokenBuffer.length === 0) {
      return this.fillBuffer()
    }
    //
    // const tokens = []
    // while (true) {
    //   const token = this.nextToken()
    //   if (!token) {
    //     break
    //   }
    //
    //   tokens.push(token)
    // }

    return this.tokenBuffer
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
    return this.tokenBuffer.shift()
  }

  nextNode (scope) {
    const node = this.resolveToken(scope)
    if (!node) {
      return null
    }

    const mapNode = this.resolveMapping(node, scope)
    // console.log('MAPNODE', mapNode)
    return mapNode
  }

  nextRealNode (scope) {
    return this.resolveToken(scope)
  }

  skipNext () {
    return this.tokenBuffer.shift()
  }

  resolveNodeName (scope) {
    return this.nodeDefinition.resolve(this.tokenBuffer, scope)
  }

  resolveToken (scope) {
    const nodeName = this.resolveNodeName(scope)

    if (!nodeName) {
      if (this.tokenBuffer.length === 0) {
        return null
      }

      if (this.tokenBuffer[0].type === 'indention') {
        this.syntaxError('Unhandeled indention detected!')
      }

      this.syntaxError('Unexpected token')
    }

    const node = this.createNode(nodeName, null, scope)
    // console.log('NODE', node)
    return node
  }

  showNextToken () {
    return this.tokenBuffer[0]
  }

  createNode (nodeName, childNode) {
    const Node = require(`${this.confDir}/nodes/${nodeName}.js`)
    const node = new Node(this, childNode)

    return node
  }

  resolveMapping (node, scope) {
    let mapNode = node

    while (true) {
      // console.log('LOOKUP', mapNode.type, scope, this.tokenBuffer[0])
      const mapNodeName = this.nodeMapping.resolve(mapNode, this.tokenBuffer, scope)
      // console.log('RESULT', mapNodeName)
      if (!mapNodeName) {
        // console.log('BREAK')
        break
      }

      if (mapNodeName === '$origin') {
        return node
      }

      if (mapNodeName === '$last') {
        return mapNode
      }

      const MapNode = require(`${this.confDir}/nodes/${mapNodeName}.js`)
      mapNode = new MapNode(this, mapNode)
      // console.log('MAPNODE', mapNode.type, ' => ', mapNodeName)
    }

    // console.log('END')
    return mapNode
  }

  createMatcher (arr) {
    function makePattern (item) {
      if (item.begin) {
        return function matchRange (self) {
          const begin = new RegExp(item.begin.source || item.begin, 'y')
          begin.lastIndex = self.index
          const end = new RegExp(item.end.source || item.end, 'g')
          if (begin.test(self.source)) {
            let value
            let nextIndex = begin.lastIndex

            if (item.matcher) {
              value = self.source.slice(self.index, nextIndex)
              const token = self.createToken(item.type, value, nextIndex)
              self.tokenBuffer.push(token)

              const subMatcher = self.createMatcher(item.matcher)
              self.fillBuffer(subMatcher)
              nextIndex = self.index
            }

            end.lastIndex = nextIndex
            while (true) {
              end.test(self.source)
              if (end.lastIndex < nextIndex) {
                throw new FSError('Unexpected EOF reached')
              }

              nextIndex = end.lastIndex
              if (self.source.charAt(nextIndex - 1) === item.escape) {
                continue
              }

              value = self.source.slice(self.index, nextIndex)
              break
            }

            const token = self.createToken(item.type, value, nextIndex)
            self.tokenBuffer.push(token)
            return true
          }

          return false
        }
      } else {
        return function matchPattern (self) {
          const pattern = item.pattern.source
          const reg = new RegExp(pattern, 'y')
          reg.lastIndex = self.index
          const match = reg.exec(self.source)

          if (!match) {
            return false
          }

          const token = self.createToken(item.type, match[0], reg.lastIndex)
          self.tokenBuffer.push(token)

          if (item.matcher) {
            const subMatcher = self.createMatcher(item.matcher)
            self.fillBuffer(subMatcher)
          }

          return true
        }
      }
    }

    return arr.map((item) => {
      return makePattern(item)
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
    let lineEnd = this.line
    let column = this.column
    let length = value.length
    let columnEnd = column + length - 1
    let isKeyword = false
    let tokenIndention = this.indention

    this.column += length

    if (type === 'identifier') {
      isKeyword = this.keyWords.includes(value)
    }

    if (type === 'indention') {
      const split = value.split('\n')
      const item = split.pop()
      length = item.length

      this.line += split.length
      line += split.length
      this.column = item.length + 1
      column = 1
      index += value.length - item.length
      this.index = nextIndex

      if (this.indentionSize) {
        if (length % this.indentionSize) {
          this.syntaxError('Unexpected indention')
        }

        value = parseInt(length / this.indentionSize)
        this.indention = value
      }
    } else if (['literal', 'comment', 'template'].includes(type)) {
      const split = value.split('\n')
      const lineLength = split.length
      const lastLine = split.pop()
      this.line += split.length
      if (split.length > 1) {
        lineEnd += (lineLength - 1)
        columnEnd = lastLine.length
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
      lineEnd: lineEnd,
      column: column,
      columnEnd: columnEnd,
      isKeyword: isKeyword,
      indention: tokenIndention
    }
  }

  sourcePreview (token) {
    token = token || this
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
      // this.fillBuffer(1)
      token = this.tokenBuffer[0] || this
    }

    const errorFile = this.filename ? ` in file ${this.filename}` : ''
    const fsErr = `${msg} at line ${token.line} in column ${token.column}${errorFile}\n${this.sourcePreview(token)}`
    throw new FSError(fsErr)
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

  getKeyword (value) {
    const token = this.nextToken()
    // console.log('TOKEN', token, this.index)
    if (token.type === 'identifier' && this.keyWords.includes(token.value)) {
      token.type = 'keyword'
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

    // const tokenBuffer = this.fillBuffer(matchDefinition.mapping.length)
    return matchDefinition.test(this.tokenBuffer)
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
   * Fills the token buffer with token items
   *
   * @return {object} Returns the filled buffer
   */
  fillBuffer (subMatch) {
    subMatch = subMatch || this.parserFuncs
    let lastIndex = null
    while (true) {
      const res = subMatch.find((fn) => {
        return fn(this)
      })

      if (!res) {
        if (!subMatch && this.index < this.length) {
          throw new FSError(`Unexpected token at line ${this.line} in column ${this.column} \n\n${this.sourcePreview()}`)
        }

        lastIndex = null
        break
      }

      if (this.index === this.length) {
        break
      }

      if (lastIndex === this.index) {
        throw new Error(`Parser stucks in a loop at index ${this.index}:${this.length}! at line ${this.line} in column ${this.column} \n\n${this.sourcePreview()}`)
      }

      lastIndex = this.index
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
    // if (this.tokenBuffer.length === 0) {
    //   this.fillBuffer(1)
    // }

    const token = this.tokenBuffer[0] || this

    return {
      index: token.index,
      length: token.length,
      line: token.line,
      lineLength: token.lineLength,
      column: token.column,
      indention: token.indention
    }
  }

  /**
   * Checks if a new child scope is comming
   *
   * @method isInnerScope
   * @returns {Boolean} Returns true if current token is type of indention and indention size is greater then current indention
   */
  isInnerScope (parentIndention) {
    parentIndention = Number.isInteger(parentIndention) ? parentIndention : this.tokenBuffer.getIndention()
    // if (this.tokenBuffer.length === 0) {
    //   this.fillBuffer(1)
    // }

    const token = this.tokenBuffer[0]
    if (!token || token.type !== 'indention') {
      return false
    }

    return parentIndention < token.value
  }

  isOuterScope (parentIndention) {
    parentIndention = Number.isInteger(parentIndention) ? parentIndention : this.tokenBuffer.getIndention()
    // if (this.tokenBuffer.length === 0) {
    //   this.fillBuffer(1)
    // }

    const token = this.tokenBuffer[0]
    if (!token || !token.type === 'indention') {
      return false
    }

    return parentIndention > token.value
  }

  isSameScope (parentIndention) {
    parentIndention = Number.isInteger(parentIndention) ? parentIndention : this.tokenBuffer.getIndention()
    // if (this.tokenBuffer.length === 0) {
    //   this.fillBuffer(1)
    // }

    const token = this.tokenBuffer[0]
    if (!token || !token.type === 'indention') {
      return false
    }

    return parentIndention === token.value
  }

  /**
   * Checks if file end was reached
   *
   * @method  isEOF
   * @returns {Boolean} Returns true if end of file was reached
   */
  isEOF () {
    // if (this.tokenBuffer.length === 0) {
    //   this.fillBuffer(1)
    // }

    return this.tokenBuffer.length === 0
  }

  print (msg) {
    // this.fillBuffer(5)
    if (msg) {
      console.log(msg)
    }

    console.log(this.tokenBuffer.slice(0, 5))
  }

  printNext (msg) {
    if (msg) {
      console.log(msg)
    }

    const token = this.showNextToken()
    if (!token) {
      console.log('> buffer end!!')
      return
    }

    console.log(`> ${token.type} ${token.value}, ind ${token.indention} buffer len ${this.tokenBuffer.length}`)
  }

  walkScope () {
    let scopeIndention = this.tokenBuffer.getIndention()
    let scopeEnd = null
    let isInlineScope = true
    // console.log('ENTER SCOPE', scopeEnd, scopeIndention, this.showNextToken())

    if (this.match('punctuator [{,[,(]')) {
      const token = this.nextToken()
      scopeEnd = this.scopeDelimiter[token.value]
      scopeIndention = null
      isInlineScope = false
    }
    // console.log('INITIAL INDENTION', scopeIndention)

    if (this.match('indention')) {
      const token = this.nextToken()
      scopeIndention = token.value
      isInlineScope = false
    }

    return {
      [ Symbol.iterator ]: () => {
        return {
          next: () => {
            if (this.match('indention')) {
              if (isInlineScope) {
                // console.log('INLINE SCOPE END')
                return { done: true, value: this }
              }

              const token = this.showNextToken()
              if (scopeIndention === null) {
                scopeIndention = token.value
              }

              if (token.value === scopeIndention) {
                this.skipNext()
                if (scopeEnd && this.match(`punctuator "${scopeEnd}"`)) {
                  this.skipNext()
                  // console.log('UNWALK DONE 1', scopeIndention, scopeEnd)
                  return { done: true, value: this }
                }
                // console.log('UNWALK CONTINUE', scopeIndention, scopeEnd, this.showNextToken())
                return { done: this.isEOF(), value: this }
              }

              if (!scopeEnd && token.value > scopeIndention) {
                this.syntaxError('Indention error!')
              }

              if (!scopeEnd && token.value < scopeIndention) {
                // console.log('UNSCOPE!')
              }

              if (scopeEnd) {
                this.skipNext()
                if (this.match(`punctuator "${scopeEnd}"`)) {
                  this.skipNext()
                } else {
                  this.syntaxError('Unexpected scope end or invalid indention!')
                }
              }

              // console.log('UNWALK DONE 2', scopeIndention, scopeEnd)
              return { done: true, value: this }
            } else if (scopeEnd && this.match('punctuator ","')) {
              this.skipNext()
              if (this.match('indention')) {
                const token = this.showNextToken()
                if (scopeIndention === null) {
                  scopeIndention = token.value
                  this.skipNext()
                } else if (token.value === scopeIndention) {
                  this.skipNext()
                } else {
                  this.syntaxError('Indention error!')
                }
              }
            } else if (scopeEnd && this.match(`punctuator "${scopeEnd}"`)) {
              this.skipNext()
              // console.log('UNWALK DONE 3', scopeIndention, scopeEnd)
              return { done: true, value: this }
            }

            // console.log('UNWALK DONE 2', scopeIndention, scopeEnd, this.showNextToken())
            return { done: this.isEOF(), value: this }
          }
        }
      }
    }
  }

  swapToken (tokenType) {
    this.tokenBuffer[0].type = tokenType
  }
}

module.exports = Parser
