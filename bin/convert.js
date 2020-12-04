const fs = require('fs')
const FirescriptTranspiler = require('firescript-transpiler').FirescriptTranspiler
const esprima = require('esprima')

module.exports = (fireio) => {
  return fireio
    .cmd('convert <file> [output]')
    .description('Convert from Javascript to Firescript')
    .option('-c, --create', 'Create new file next to input file')
    .option('-v, --verbose', 'Verbose log')
    .action((ctx, file, output) => {
      const fsSource = fs.readFileSync(file, { encoding: 'utf8' })
      const ast = esprima.parseModule(fsSource, {
        loc: true,
        range: !!ctx.range,
        comment: ctx.comments,
        filename: file
      })

      const transpiler = new FirescriptTranspiler({
        filename: file
      })

      try {
        const source = transpiler.transpile(ast)
        if (ctx.create) {
          output = file.replace(/\.js$/, '.fire')
        }

        if (output) {
          fs.writeFileSync(output, source, { encoding: 'utf8' })
        } else {
          console.log(source)
        }
      } catch (err) {
        if (err.__isFSError) {
          err.source = fsSource
        }

        console.log('Convert failed!', err.message)
        console.log(transpiler)
      }
    })
}
