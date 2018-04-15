const Program = require('./js-elements/Program')
const RenderContext = require('./RenderContext')

class JSTranspiler {
  constructor (featureConf) {
    this.featureConf = featureConf
  }
  transpile (ast) {
    try {
      const jse = new Program(ast)
      Object.assign(jse.featureConf, this.featureConf)

      const ctx = new RenderContext()
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
