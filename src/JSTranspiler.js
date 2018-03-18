const Program = require('./js-elements/Program')

class JSTranspiler {
  transpile (ast) {
    try {
      const jse = new Program(ast)
      return jse.toString()
    } catch (err) {
      if (!err.token) {
        throw err
      }
      this.syntaxError(err)
    }
  }
}

module.exports = JSTranspiler
