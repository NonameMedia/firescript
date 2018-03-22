const Program = require('./js-elements/Program')
const RenderContext = require('./RenderContext')

class JSTranspiler {
  transpile (ast) {
    try {
      const jse = new Program(ast)
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
