const Tokenizer = require('./FireScriptTokenizer')
const Program = require('./fs-nodes/Program')

class FireScriptParser {
  constructor (conf) {
    conf = conf || {}

    this.setLocation = conf.loc || false
    this.setRange = conf.range || false

    this.keyWords = 'import|func|class|const|let|var|return'
    this.punctuatorChars = '[.=(){},+*/-]'
    this.literalPattern = '\'[^]+?\'|\\d+'
    this.binaryOperatorPattern = /^[+*/&-]$/
    this.indentionStr = '  '
    this.showIndex = conf.index === undefined ? true : conf.index
    this.showLines = conf.lines === undefined ? true : conf.line
    this.callStack = []
  }

  tokenize (source) {
    const tokenizer = new Tokenizer({
      range: this.setRange || false,
      loc: true
    })

    return tokenizer.tokenize(source)
  }

  parse (source) {
    const token = this.tokenize(source)
    this.__input = source

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
    const startLine = Math.max(0, token.loc.start[0] - 3)
    const endLine = Math.max(0, token.loc.start[0])
    const previewArr = source.slice(startLine, endLine)
    const preview = previewArr.map((line, index) => {
      const lineNum = ` ${startLine + index + 1}`.slice(String(endLine).length)
      return `${lineNum} | ${line}\n`
    }).join('').concat(`${' '.repeat(token.loc.start[1] + String(endLine).length + 3)}^\n`)

    err.message = `${err.message}\n\n${preview}`
    err.stack = '\n\n' + err.callStack.join('\n') + '\n\n' + err.stack
    throw err
  }
}

module.exports = FireScriptParser
