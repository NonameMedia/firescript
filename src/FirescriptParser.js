const Tokenizer = require('./FirescriptTokenizer')
const Program = require('./fs-nodes/Program')
const ParserContext = require('./ParserContext')

class FirescriptParser {
  constructor (conf) {
    conf = conf || {}

    this.setLocation = conf.setLocation || false
    this.setRange = conf.setRange || false
    this.indentionSize = conf.indention || 2
    this.keyWords = 'import|func|class|const|let|var|return'
    this.literalPattern = '\'[^]+?\'|\\d+'
    this.binaryOperatorPattern = /^[+*/&-]$/
    this.showIndex = conf.index === undefined ? true : conf.index
    this.showLines = conf.lines === undefined ? true : conf.line
    this.callStack = []
    this.sourceType = conf.sourceType
  }

  tokenize (source) {
    const tokenizer = new Tokenizer({
      range: this.setRange || false,
      loc: true,
      indentionSize: this.indentionSize
    })

    return tokenizer.tokenize(source)
  }

  parse (source) {
    const token = this.tokenize(source)
    this.__input = source

    try {
      const ast = new Program(token, null, this.sourceType)
      const ctx = new ParserContext({
        setLocation: this.setLocation,
        setRange: this.setRange
      })

      return ast.toJSON(ctx)
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
    let preview = ''

    if (token.loc) {
      const startLine = Math.max(0, token.loc.start[0] - 12)
      const endLine = Math.max(0, token.loc.start[0])
      const previewArr = source.slice(startLine, endLine)
      preview = previewArr.map((line, index) => {
        const lineNum = ` ${startLine + index + 1}`.slice(-String(endLine).length)
        return `${lineNum} | ${line}\n`
      }).join('').concat(`${' '.repeat(token.loc.start[1] + String(endLine).length + 3)}^\n`)
    }

    const callTree = err.callTree ? JSON.stringify(err.callTree, null, 2) : ''
    const tryErrors = err.tryErrors ? '\n\n' + err.tryErrors.map((tryErr) => {
      return `${tryErr[0]}: ${tryErr[1]}`
    }).join('\n\n') : ''
    err.message = `${err.message}\n\n${preview}\n\n${callTree}${tryErrors}`
    err.stack = '\n\n' + err.callStack.join('\n') + '\n\n' + err.stack

    throw err
  }
}

module.exports = FirescriptParser
