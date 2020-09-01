const fs = require('fs')
const path = require('path')
const colorfy = require('colorfy')
const FirescriptParser = require('firescript-parser').FirescriptParser
const FirescriptLinter = require('firescript-linter').FirescriptLinter
const JavascriptTranspiler = require('firescript-transpiler').JavascriptTranspiler
const {
  FSConfig
} = require('../src/app.js')

module.exports = (fireio) => {
  const cmd = fireio
    .cmd('exec <file>')
    .description('Executes a .fire file')
    .action((ctx, file) => {
      function compile (mod, filename) {
        const source = fs.readFileSync(filename, 'utf8')
        const parser = new FirescriptParser()
        const fsAst = parser.parse(source)
        const linter = new FirescriptLinter()
        const session = linter.lint(fsAst)

        if (session.status === 'failed') {
          session.exceptions.forEach((exception) => {
            const location = exception.location
              ? `in file ${colorfy.grey(file)} at line ${colorfy.grey(exception.location[0])}` : ''
            console.log(
              `🔥${exception.message}`,
              `(${colorfy.red(exception.exception)})`,
              location
            )
          })
        }

        const fsConf = new FSConfig()
        // if (opts && opts.features) {
        //   fsConf.merge({
        //     features: opts.features
        //   })
        // }
        const opts = {}

        opts.features = fsConf.getConf('features')
        const transpiler = new JavascriptTranspiler(opts)
        const jsSource = transpiler.transpile(fsAst)

        mod._compile(jsSource, filename)
      }

      // eslint-disable-next-line node/no-deprecated-api
      require.extensions['.fire'] = compile
      require(path.resolve(process.cwd(), file))
    })

  fireio.__commands.setDefaultCommand('exec')
  return cmd
}
