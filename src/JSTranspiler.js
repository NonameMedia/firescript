const Program = require('./js-elements/Program')
const RenderContext = require('./RenderContext')
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

      const ctx = new RenderContext(this.config.getConf('features'))
      return jse.toESString(ctx)
    } catch (err) {
      if (!err.token) {
        throw err
      }
      this.syntaxError(err)
    }
  }
}

module.exports = JSTranspiler
