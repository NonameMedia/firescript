const fs = require('fs')
const path = require('path')
const colorfy = require('colorfy')
const FirescriptParser = require('firescript-parser').FirescriptParser
const FirescriptLinter = require('firescript-linter').FirescriptLinter

module.exports = (fireio) => {
  return fireio
    .cmd('lint <file>')
    .description('Lint a .fire file')
    .action((ctx, file) => {
      const fsSource = fs.readFileSync(file, { encoding: 'utf8' })
      if (path.extname(file) === '.fire') {
        try {
          const parser = new FirescriptParser()
          const fsAst = parser.parse(fsSource)
          // const ast = Firescript.parse(fsSource, {
          //   type: 'fire',
          //   setLocation: true,
          //   filename: file
          // })
          const linter = new FirescriptLinter()
          const session = linter.lint(fsAst)

          if (session.status === 'success') {
            return
          }

          session.exceptions.forEach((exception) => {
            const location = exception.location
              ? `in file ${colorfy.grey(file)} at line ${colorfy.grey(exception.location[0])}` : ''
            console.log(
              `🔥${exception.message}`,
              `(${colorfy.red(exception.exception)})`,
              location
            )
          })
        } catch (err) {
          console.log('PARSE error:', err.stack)
        }
      }
    })
}
