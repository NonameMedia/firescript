class FireScriptParser {
  constructor () {
    this.keyWords = 'import|func'
    this.punctationChars = '[.=(){}]'
    this.stringPattern = '\'[^]+?\''
    this.indentionStr = '  '
  }

  tokenize (source) {
    const reg = new RegExp(`(\\n\\s*)|(${this.keyWords})|(${this.punctationChars})|(${this.stringPattern})|([a-zA-Z][a-zA-Z0-9$_-]*)`, 'g')
    const token = []
    let lineNum = 0
    let lastIndex = 0

    while (true) {
      lastIndex = reg.lastIndex
      const match = reg.exec(source)
      if (!match) {
        break
      }

      // console.log(match)
      if (match[1] !== undefined) {
        const indention = match[1].substr(match[1].lastIndexOf('\n') + 1)

        token.push({
          type: 'indention',
          indention: indention.length,
          index: [reg.lastIndex - indention.length, reg.lastIndex],
          line: lineNum += 1
        })

        continue
      }

      if (match[2] !== undefined) {
        token.push({
          type: 'keyword',
          value: match[2],
          index: [lastIndex, reg.lastIndex],
          line: lineNum += 1
        })

        continue
      }

      if (match[3] !== undefined) {
        token.push({
          type: 'punctation',
          value: match[3],
          index: [lastIndex, reg.lastIndex],
          line: lineNum += 1
        })

        continue
      }

      if (match[4] !== undefined) {
        token.push({
          type: 'literal',
          value: match[4],
          index: [lastIndex, reg.lastIndex],
          line: lineNum += 1
        })

        continue
      }

      if (match[5] !== undefined) {
        token.push({
          type: 'identifier',
          value: match[5],
          index: [lastIndex, reg.lastIndex],
          line: lineNum += 1
        })

        continue
      }
    }

    return token
  }

  parse (source) {
    this.token = this.tokenize(source)
    console.log('TOKEN', this.token)
    return this.parseProgram()
  }

  parseProgram () {
    const body = []

    while (true) {
      const nextToken = this.getNextToken()
      if (!nextToken) {
        break
      }

      body.push(this.parseToken())
    }

    const node = {
      type: 'Program',
      sourceType: 'module',
      body: body
    }

    return node
  }

  parseToken () {
    const token = this.token.shift()
    if (token.type === 'keyword') {
      if (token.value === 'import') {
        return this.parseImportDeclaration()
      }

      if (token.value === 'func') {
        return this.parseFunctionDeclaration()
      }
    }

    console.log('UNUSED TOKEN', token)
  }

  parseImportDeclaration () {
    const specifiers = []

    while (true) {
      const nextToken = this.getNextToken()
      if (nextToken.type === 'identifier') {
        if (nextToken.value === 'from') {
          this.token.shift()
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

  parseFunctionDeclaration () {
    let id
    let params = []
    let body = {}

    const token = this.token.shift()
    if (token.type === 'identifier') {
      id = this.parseIdentifier()
    }

    const nextToken = this.getNextToken()
    console.log('NEX TOK', nextToken)
    if (nextToken.type === 'punctation' && nextToken.value === '(') {
      while (true) {
        const token = this.token.shift()
        console.log('TOK', token)
        if (token.type === 'punctation' && token.value === ')') {
          break
        }

        if (token.type === 'identifier') {
          params.push(token.value)
          continue
        }

        if (token.type === 'punctation' && token.value === ',') {
          continue
        }
      }
    }

    const node = {
      async: false,
      expression: false,
      generator: false,
      type: 'FunctionDeclaration',
      id,
      params,
      body
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

  parseIdentifier () {
    const token = this.token.shift()

    const node = {
      name: token.value,
      type: 'Identifier'
    }

    return node
  }

  parseLiteral () {
    const token = this.token.shift()

    const node = {
      type: 'Literal',
      raw: token.value,
      value: token.value.slice(1, -1)
    }

    return node
  }

  getNextToken () {
    return this.token[0]
  }
}

module.exports = FireScriptParser
