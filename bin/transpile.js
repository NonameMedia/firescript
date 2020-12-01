const fs = require('fs')
const path = require('path')
const colorfy = require('colorfy')
const FirescriptParser = require('firescript-parser').FirescriptParser
const JavascriptTranspiler = require('firescript-transpiler').JavascriptTranspiler

module.exports = (fireio) => {
  return fireio
    .cmd('transpile <file> [output]')
    .description('Reads a .fire file and transpiles it into Javascript')
    .option('-v,--verbose', 'Verbose log')
    .option('-l, --location', 'Add location')
    .option('-p, --pretty', 'Prettify output')
    .action((ctx, file, output) => {
      file = path.resolve(process.cwd(), file)
      const input = path.extname(file) === '.json'
        ? require(file)
        : fs.readFileSync(file, { encoding: 'utf8' })

      // const source = Firescript.transpile(input, {
      //   type: /* ctx.type || */ path.extname(file) === '.fire' ? 'fire' : 'js',
      //   setLocation: !!ctx.location,
      //   verbose: ctx.verbose,
      //   filename: file
      // })

      const parser = new FirescriptParser({
        filename: file
      })
      const fsAst = parser.parse(input)

      const transpiler = new JavascriptTranspiler({
        filename: file
      })

      const source = transpiler.transpile(fsAst)

      // try {
      //   const ast = parser.parse(input, {
      //     // includeComments: ctx.comments,
      //     // setLocation: !!ctx.location,
      //     // setRange: !!ctx.range,
      //     filename: file
      //   })
      //
      //   const source = JSON.stringify(ast, null, '  ')
      //
      //   if (output) {
      //     fs.writeFileSync(output, source, { encoding: 'utf8' })
      //   } else {
      //     console.log(source)
      //   }
      // } catch (err) {
      //   throw colorizeParseError(err)
      // }

      if (output) {
        fs.writeFileSync(output, source, { encoding: 'utf8' })
      } else {
        if (ctx.pretty) {
          const lines = source.split('\n')
          const gutterSize = String(lines.length).length
          lines.forEach((line, index) => {
            const gutter = String(index + 1).padStart(gutterSize, ' ')
            console.log(`${colorfy.grey(gutter)} ${colorfy.dgrey('|')}`, line)
          })
        } else {
          console.log(source)
        }
      }
    })
}
