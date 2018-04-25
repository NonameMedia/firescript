
const FireScriptTokenizer = require('./FireScriptTokenizer')
const FireScriptParser = require('./FireScriptParser')
const JSParser = require('./JSParser')
const FireScriptTranspiler = require('./FireScriptTranspiler')
const JSTranspiler = require('./JSTranspiler')
const FSConfig = require('./utils/FSConfig')

module.exports = {
  FireScriptTokenizer,
  FireScriptParser,
  FireScriptTranspiler,
  JSTranspiler,
  JSParser,
  tokenize (input, opts) {
    const tokenizer = new FireScriptTokenizer(opts)
    return tokenizer.tokenize(input)
  },
  transpile (input, opts) {
    opts = Object.assign(opts || {}, {
      type: 'fire'
    })

    let ast

    if (typeof input === 'string') {
      if (opts.verbose) console.log(`[TRANSPILER] Transpile source into ${opts.type === 'fire' ? 'Javascript' : 'FireScript'}`)
      const parser = opts.type === 'js' ? new JSParser() : new FireScriptParser()
      ast = parser.parse(input)
    } else {
      if (opts.verbose) console.log(`[TRANSPILER] Transpile AST into ${opts.type === 'fire' ? 'Javascript' : 'FireScript'}`)
      ast = input
    }

    const transpiler = opts.type === 'js' ? new FireScriptTranspiler() : new JSTranspiler()
    return transpiler.transpile(ast)
  },
  parse (input, opts) {
    opts = opts || {}
    const parser = opts.type === 'js' ? new JSParser() : new FireScriptParser()
    return parser.parse(input)
  },
  loadConf (customConf) {
    const config = new FSConfig()
    return config.merge(customConf)
  }
}
