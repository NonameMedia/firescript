const Program = require('./js-elements/Program')
const RenderContext = require('./RenderContext')
const FSConfig = require('./utils/FSConfig')

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
      const jse = new Program(ast, this.config.getConf('features'))

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
