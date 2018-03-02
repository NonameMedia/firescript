const prettier = require('prettier')

const FireScriptTokenizer = require('./FireScriptTokenizer')
const FireScriptParser = require('./FireScriptParser')
const JSParser = require('./JSParser')
const FireScriptTranspiler = require('./FireScriptTranspiler')

module.exports = {
  FireScriptTokenizer,
  FireScriptParser,
  FireScriptTranspiler,
  JSParser: require('./JSParser'),
  tokenize (input, opts) {
    const tokenizer = new FireScriptTokenizer(opts)
    return tokenizer.tokenize(input)
  },
  transpile (input, opts) {
    return prettier.format('', {
      parser () {
        const fsParser = new FireScriptParser(opts)
        const ast = fsParser.parse(input)
        return ast
      }
    })
  },
  parse (input, opts) {
    opts = opts || {}
    const parser = opts.type === 'js' ? new JSParser() : new FireScriptParser()
    return parser.parse(input)
  },
  retranspile (input, opts) {
    return prettier.format('', {
      parser () {
        const fsParser = new FireScriptParser(opts)
        const ast = fsParser.parse(input)
        return ast
      }
    })
  }
}
