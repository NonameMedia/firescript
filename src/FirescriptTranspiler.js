const Program = require('./fs-elements/Program')
const RenderContext = require('./RenderContext')

/**
 * Transpiles an AST object into Firescript
 *
 * @class FirescriptTranspiler
 */
class FirescriptTranspiler {
  // constructor (opts) {
  //   this.config = new FSConfig()
  //
  //   if (opts && opts.features) {
  //     this.config.merge({
  //       features: opts.features
  //     })
  //   }
  // }

  transpile (ast) {
    try {
      const fireScript = new Program(ast)
      const ctx = new RenderContext({}, 'fire')
      return fireScript.toFSString(ctx).trim() + '\n'
    } catch (err) {
      if (!err.token) {
        throw err
      }
      this.syntaxError(err)
    }
  }
}

module.exports = FirescriptTranspiler
