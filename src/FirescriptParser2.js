const Program = require('./fs-nodes/Program')
const ParserContext = require('./ParserContext')
const Parser = require('./Parser')

class FirescriptParser {
  constructor (opts) {
    opts = opts || {}

    super(opts)

    // this.setLocation = conf.setLocation || false
    // this.setRange = conf.setRange || false
    // this.indentionSize = conf.indention || 2
    // this.keyWords = 'import|func|class|const|let|var|return'
    // this.literalPattern = '\'[^]+?\'|\\d+'
    // this.binaryOperatorPattern = /^[+*/&-]$/
    // this.showIndex = conf.index === undefined ? true : conf.index
    // this.showLines = conf.lines === undefined ? true : conf.line
    // this.callStack = []
    // this.sourceType = conf.sourceType
  }

  parse (source) {
    try {
      const parser = new Parser()
      parser.parse(source)

      const ast = new Program(parser, null, this.sourceType)
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
}

module.exports = FirescriptParser
