const FireScriptTokenizer = require('./FireScriptTokenizer')
const FireScriptParser = require('./FireScriptParser')
const FireScriptTranspiler = require('./FireScriptTranspiler')

module.exports = {
  FireScriptTokenizer,
  FireScriptParser,
  FireScriptTranspiler,
  JSParser: require('./JSParser'),
  tokenize (input, opts) {
    const tokenizer = new FireScriptTokenizer(opts)
    return tokenizer.tokenize(input)
  }
}
