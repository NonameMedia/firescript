const fs = require('fs')
const path = require('path')
const FireScript = require('../src/app')

module.exports = (supershit) => {
  return supershit
    .cmd('transpile <file>')
    .option('-v,--verbose', 'Verbose log')
    .option('-j,--javascript', 'Transpile into Javascript')
    .action((ctx, file) => {
      file = path.resolve(process.cwd(), file)
      const input = path.extname(file, '.json')
        ? require(file)
        : fs.readFileSync(file, { encoding: 'utf8' })

      const source = FireScript.transpile(input, {
        type: ctx.javascript || path.extname(file, '.fire') ? 'fire' : 'js',
        verbose: ctx.verbose
      })

      console.log(source)
    })
}
