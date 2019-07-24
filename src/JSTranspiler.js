const Program = require('./js-elements/Program')
const SourceBuffer = require('./SourceBuffer')
const FSConfig = require('./utils/FSConfig')
const ASTTransformer = require('./ASTTransformer')

class JSTranspiler {
  constructor (opts) {
    this.config = new FSConfig()

    if (opts && opts.features) {
      this.config.merge({
        features: opts.features
      })
    }
  }

  transpile (ast) {
    try {
      const astTransformer = new ASTTransformer(this.config.getConf('features'))
      astTransformer.load('js-transformations')

      const tast = astTransformer.transform(ast)
      const jse = new Program(tast, this.config.getConf('features'))

      const buffer = new SourceBuffer()
      jse.compile(buffer)
      buffer.createLocationMap()

      const source = buffer.toString()
      return source.replace(/\s*$/, '\n')
    } catch (err) {
      if (!err.token) {
        throw err
      }
      this.syntaxError(err)
    }
  }
}

module.exports = JSTranspiler
