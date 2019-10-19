const Program = require('./js-elements/Program')
const SourceBuffer = require('./SourceBuffer')
const ASTTransformer = require('./ASTTransformer')

class JSTranspiler {
  constructor (opts = {}) {
    this.filename = opts.filename
    this.featureConf = opts.features
  }

  transpile (ast) {
    try {
      const astTransformer = new ASTTransformer(this.featureConf)
      astTransformer.load('js-transformations')

      const tast = astTransformer.transform(ast)
      const jse = new Program(tast, this.featureConf)

      const buffer = new SourceBuffer()
      jse.compile(buffer)
      buffer.createLocationMap()

      const source = buffer.toString()
      return source.replace(/\s*$/, '\n')
    } catch (err) {
      if (this.filename) {
        err.message += ` in file ${this.filename}`
      }

      throw err
    }
  }
}

module.exports = JSTranspiler
