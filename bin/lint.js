const fs = require('fs')
const path = require('path')
const colorfy = require('colorfy')
const FirescriptParser = require('firescript-parser').FirescriptParser
const FirescriptLinter = require('firescript-linter').FirescriptLinter

module.exports = (fireio) => {
  return fireio
    .cmd('lint <file>')
    .description('Lint a .fire file')
    .option('--no-colors', 'Disable cli colors')
    .option('-v, --verbose', 'Verbose log')
    .action((ctx, file) => {
      if (path.extname(file) === '.fire') {
        try {
          const fsSource = fs.readFileSync(file, { encoding: 'utf8' })
          const parser = new FirescriptParser({
            filename: file
          })
          const fsAst = parser.parse(fsSource)
          const linter = new FirescriptLinter()
          const session = linter.lint(fsAst)

          if (session.status === 'success') {
            return
          }

          session.exceptions.forEach((exception) => {
            const location = exception.location
              ? `in file ${colorfy.grey(file)} at line ${colorfy.grey(exception.location[0])} in column ${colorfy.grey(exception.location[1])}` : ''
            console.log(
              `🔥${exception.message}`,
              `(${colorfy.red(exception.exception)})`,
              location
            )
          })
        } catch (err) {
          if (ctx.noColors) {
            err.colorsEnabled = false
          }

          console.log(ctx.verbose ? err.stack : err.toString())
          process.exit(1)
        }
      } else {
        console.log('File seems not to be a .fire file')
        process.exit(1)
      }
    })
}
