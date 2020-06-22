const path = require('path')
const fs = require('fs')
const { FirescriptParser, Parser } = require('firescript-parser')
const FirescriptLinter = require('firescript-linter').FirescriptLinter
const FirescriptTranspiler = require('firescript-transpiler').FirescriptTranspiler
const JSTranspiler = require('firescript-transpiler').JSTranspiler
const FSConfig = require('./utils/FSConfig')
const esprima = require('esprima')

module.exports = {
  FirescriptParser,
  FirescriptTranspiler,
  FirescriptLinter,
  JSTranspiler,
  Parser,
  tokenize (input, opts) {
    const parser = new FirescriptParser(opts)
    return parser.tokenize(input)
  },
  transpileFile (filename, opts = {}) {
    const ext = path.extname(filename)
    opts.type = opts.type || ext === '.fire' ? 'fire' : 'js'
    return this.transpile(fs.readFileSync(filename, 'utf8'), opts)
  },
  transpile (input, opts) {
    opts = Object.assign({
      type: 'fire'
    }, opts || {})

    let ast

    if (typeof input === 'string') {
      if (opts.verbose) console.log(`[TRANSPILER] Transpile source into ${opts.type === 'fire' ? 'Javascript' : 'Firescript'}`)
      if (opts.type === 'js') {
        ast = esprima.parseModule(input, {
          loc: !!opts.location,
          range: !!opts.range,
          comment: opts.comments
        })
      } else {
        const parser = new FirescriptParser(opts)
        ast = parser.parse(input)
      }
    } else {
      if (opts.verbose) console.log(`[TRANSPILER] Transpile AST into ${opts.type === 'fire' ? 'Javascript' : 'Firescript'}`)
      ast = input
    }

    // if (opts.linting && opts.type === 'fire') {
    //   const linter = new FirescriptLinter()
    //   const lintSession = linter.lint(ast)
    //   if (lintSession.status === 'failed') {
    //     lintSession.exceptions.forEach((exception) => {
    //       const location = exception.location
    //         ? `in file ${colorfy.grey(file)} at line ${colorfy.grey(exception.location[0])}` : ''
    //       console.log(
    //         `🔥${exception.message}`,
    //         `(${colorfy.red(exception.exception)})`,
    //         location
    //       )
    //     })
    //   }
    // }

    if (opts.type === 'js') {
      const transpiler = new FirescriptTranspiler(opts)
      return transpiler.transpile(ast)
    } else {
      const fsConf = new FSConfig()
      if (opts && opts.features) {
        fsConf.merge({
          features: opts.features
        })
      }

      opts.features = fsConf.getConf('features')
      const transpiler = new JSTranspiler(opts)
      return transpiler.transpile(ast)
    }
  },
  parse (input, opts) {
    opts = opts || {}
    let ast
    if (opts.type === 'js') {
      ast = esprima.parseModule(input, {
        loc: !!opts.location,
        range: !!opts.range,
        comment: opts.comments
      })
    } else {
      const parser = new FirescriptParser(opts)
      ast = parser.parse(input)
    }
    return ast
  },
  loadConf (customConf) {
    const config = new FSConfig()
    return config.merge(customConf)
  }
}
