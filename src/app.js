const path = require('path')
const fs = require('fs')
const { FirescriptParser, Parser } = require('firescript-parser')
const FirescriptConfig = require('firescript-config').FirescriptConfig
const FirescriptLinter = require('firescript-linter').FirescriptLinter
const FirescriptTranspiler = require('firescript-transpiler').FirescriptTranspiler
const JavascriptTranspiler = require('firescript-transpiler').JavascriptTranspiler
const esprima = require('esprima')

module.exports = {
  FirescriptParser,
  FirescriptTranspiler,
  FirescriptLinter,
  JavascriptTranspiler,
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

    const config = new FirescriptConfig(opts)

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
        const parserConf = config.getConfig('parser')
        parserConf.filename = opts.filename
        const parser = new FirescriptParser(parserConf)
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
      opts.features = config.getConfig('features')
      const transpiler = new JavascriptTranspiler(opts)
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
    console.warn('Firescript.loadConf is deprecated! Use FirescriptConfig module instead')
    return new FirescriptConfig()
  },
  version (print) {
    const loadVersion = (pkgName) => {
      try {
        return `v${require(pkgName).version}`
      } catch (err) {
        return 'Not installed'
      }
    }
    const version = loadVersion('../package.json')
    const builderVersion = loadVersion('firescript-builder/package.json')
    const parserVersion = loadVersion('firescript-parser/package.json')
    const transpilerVersion = loadVersion('firescript-transpiler/package.json')
    const linterVersion = loadVersion('firescript-linter/package.json')

    if (print) {
      console.log(`Firescript:            ${version}`)
      console.log(`Firescript Builder:    ${builderVersion}`)
      console.log(`Firescript Parser:     ${parserVersion}`)
      console.log(`Firescript Linter:     ${linterVersion}`)
      console.log(`Firescript Transpiler: ${transpilerVersion}`)
    }

    return {
      firescript: version,
      'firescript-builder': builderVersion,
      'firescript-parser': parserVersion,
      'firescript-linter': linterVersion,
      'firescript-transpiler': transpilerVersion
    }
  }
}
