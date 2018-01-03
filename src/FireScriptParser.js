const Program = require('./fs-nodes/Program')

class FireScriptParser {
  constructor (conf) {
    conf = conf || {}

    this.keyWords = 'import|func|class|const|let|var|return'
    this.punctationChars = '[.=(){},+*/-]'
    this.stringPattern = '\'[^]+?\''
    this.binaryOperatorPattern = /^[+*/&-]$/
    this.indentionStr = '  '
    this.showIndex = conf.index === undefined ? true : conf.index
    this.showLines = conf.lines === undefined ? true : conf.line
    this.callStack = []
  }

  tokenize (source) {
    const reg = new RegExp(`(\\n\\s*)|(${this.keyWords})|(${this.punctationChars})|(${this.stringPattern})|([a-zA-Z][a-zA-Z0-9$_-]*)`, 'g')
    const token = []
    let lineNum = 1
    let lastEOLIndex = 0

    while (true) {
      const match = reg.exec(source)
      if (!match) {
        break
      }

      // console.log(match)
      if (match[1] !== undefined) {
        const indention = match[1].substr(match[1].lastIndexOf('\n') + 1)
        lastEOLIndex = reg.lastIndex - indention.length

        const item = {
          type: 'indention',
          value: indention.length
        }

        if (this.showIndex) {
          item.index = [reg.lastIndex - indention.length, reg.lastIndex]
        }

        if (this.showLines) {
          item.line = lineNum += 1
        }

        token.push(item)
        continue
      }

      if (match[2] !== undefined) {
        const item = {
          type: 'keyword',
          value: match[2]
        }

        if (this.showIndex) {
          item.index = [reg.lastIndex - match[2].length, reg.lastIndex]
        }

        if (this.showLines) {
          item.line = [lineNum, reg.lastIndex - lastEOLIndex - match[2].length + 1]
        }

        token.push(item)
        continue
      }

      if (match[3] !== undefined) {
        const item = {
          type: 'punctation',
          value: match[3]
        }

        if (this.showIndex) {
          item.index = [reg.lastIndex - match[3].length, reg.lastIndex]
        }

        if (this.showLines) {
          item.line = [lineNum, reg.lastIndex - lastEOLIndex - match[3].length + 1]
        }

        token.push(item)
        continue
      }

      if (match[4] !== undefined) {
        const item = {
          type: 'literal',
          value: match[4]
        }

        if (this.showIndex) {
          item.index = [reg.lastIndex - match[4].length, reg.lastIndex]
        }

        if (this.showLines) {
          item.line = [lineNum, reg.lastIndex - lastEOLIndex - match[4].length + 1]
        }

        token.push(item)
        continue
      }

      if (match[5] !== undefined) {
        const item = {
          type: 'identifier',
          value: match[5]
        }

        if (this.showIndex) {
          item.index = [reg.lastIndex - match[5].length, reg.lastIndex]
        }

        if (this.showLines) {
          item.line = [lineNum, reg.lastIndex - lastEOLIndex - match[5].length + 1]
        }

        token.push(item)
        continue
      }
    }

    return token
  }

  parse (source) {
    const token = this.tokenize(source)
    this.__input = source
    console.log('TOKEN', token)

    try {
      const ast = new Program(token)
      return ast.toJSON()
    } catch (err) {
      if (!err.token) {
        throw err
      }
      this.syntaxError(err)
    }
  }

  parseToken () {
    const nextToken = this.getNextToken()
    if (!nextToken) {
      return null
    }

    if (nextToken.type === 'indention') {
      this.getToken('Token')
      return this.parseToken()
    }

    if (nextToken.type === 'keyword') {
      if (nextToken.value === 'import') {
        return this.parseImportDeclaration()
      }

      if (nextToken.value === 'func') {
        return this.parseFunctionDeclaration()
      }

      if (['var', 'const', 'let'].includes(nextToken.value)) {
        return this.parseVariableDeclaration()
      }
    }

    if (nextToken.type === 'identifier') {
      return this.parseIdentifier()
    }

    if (nextToken.type === 'literal') {
      return this.parseLiteral()
    }

    if (nextToken.type === 'punctation') {
      if (this.binaryOperatorPattern.test(nextToken.value)) {
        return this.parseBinaryExpression()
      }
    }

    console.log('UNUSED TOKEN', nextToken)
    this.syntaxError('Unexpected token', nextToken)
  }

  parseImportDeclaration () {
    let token = this.getToken('ImportDeclaration')
    if (!token.type === 'import') {
      this.syntaxError(`${token.value} is not a import declaration`)
    }

    const specifiers = []

    while (true) {
      const nextToken = this.getNextToken()
      if (nextToken.type === 'identifier') {
        if (nextToken.value === 'from') {
          this.getToken('ImportDeclaration')
          break
        }

        specifiers.push(this.parseImportDefaultSpecifier())
      } else {
        console.log(nextToken)
        break
      }
    }

    const nextToken = this.getNextToken()
    let source
    if (nextToken.type === 'literal') {
      source = this.parseLiteral()
    }

    const node = {
      type: 'ImportDeclaration',
      source,
      specifiers
    }

    return node
  }



  parseImportDefaultSpecifier () {
    const node = {
      type: 'ImportDefaultSpecifier',
      local: this.parseIdentifier()
    }

    return node
  }

  parseVariableDeclaration () {
    let token = this.getToken('VariableDeclaration')
    if (!['var', 'const', 'let'].includes(token.value)) {
      this.syntaxError(`${token.value} is not a variable declaration`)
    }

    console.log('VAR', token)

    const kind = token.value
    const declarations = []

    while (true) {
      const nextToken = this.getNextToken()
      if (nextToken.type === 'identifier') {
        declarations.push(this.parseVariableDeclarator())
      } else {
        break
      }
    }

    const node = {
      kind,
      type: 'VariableDeclaration',
      declarations
    }

    return node
  }

  parseVariableDeclarator () {
    const node = {
      type: 'VariableDeclarator',
      id: this.parseIdentifier(),
      init: null
    }

    const nextToken = this.getNextToken()
    if (nextToken.type === 'punctation' && nextToken.value === '=') {
      this.getToken('VariableDeclarator')
      node.init = this.parseToken()
    }

    return node
  }

  parseBinaryExpression () {
    const token = this.getToken('BinaryExpression')

    if (token.type !== 'punctation' && !this.binaryOperatorPattern.test(token.value)) {
      this.syntaxError('Token is not a binary operator', token)
    }

    const operator = token.value
    const left = this.getPreviousSibling()
    const right = this.parseToken()

    const node = {
      type: 'BinaryExpression',
      left,
      right,
      operator
    }

    this.replacePreviousSibling(node)
    return node
  }

  parseOperator () {
    if (token.type === 'punctation') {
      if (!/^[+*/-]$/.test(token.value)) {
      }
    } else {
      this.syntaxError('Unexpected token', token)
    }

    return token.value
  }

  parseLiteral () {
    const token = this.getToken('Literal')

    const node = {
      type: 'Literal',
      raw: token.value,
      value: token.value.slice(1, -1)
    }

    return node
  }

  getToken (method) {
    const token = this.token.shift()
    this.callStack.push(`${method} @ ${token.type} | ${token.value}`)
    return token
  }

  getNextToken () {
    return this.token[0]
  }

  lookForward (numItems, type, value) {
    const token = this.token[numItems - 1]
    if (!token) {
      return false
    }

    if (token.type !== type) {
      return false
    }

    if (value && token.value !== value) {
      return false
    }

    return true
  }

  syntaxError (err) {
    const token = err.token
    const source = this.__input.split(/\n/g)
    const startLine = Math.max(0, token.line[0] - 3)
    const endLine = Math.max(0, token.line[0])
    const previewArr = source.slice(startLine, endLine)
    const preview = previewArr.map((line, index) => {
      const lineNum = ` ${startLine + index + 1}`.slice(String(endLine).length)
      return `${lineNum} | ${line}\n`
    }).join('').concat(`${' '.repeat(token.line[1] + String(endLine).length + 2)}^\n`)

    err.message = `${err.message} at line ${token.line[0]} at column ${token.line[1]}\n\n${preview}`
    err.stack = '\n\n' + this.callStack.join('\n') + '\n\n' + err.stack
    throw err
  }
}

module.exports = FireScriptParser
