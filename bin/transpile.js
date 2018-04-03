const fs = require('fs')
const path = require('path')
const FireScript = require('../src/app')

module.exports = (supershit) => {
  return supershit
    .cmd('transpile <file> [output]')
    .option('-v,--verbose', 'Verbose log')
    .option('-t,--type', 'Set the source type. (fire|js)')
    .action((ctx, file, output) => {
      file = path.resolve(process.cwd(), file)
      const input = path.extname(file, '.json') === '.json'
        ? require(file)
        : fs.readFileSync(file, { encoding: 'utf8' })

      const source = FireScript.transpile(input, {
        type: ctx.type || path.extname(file, '.fire') ? 'fire' : 'js',
        verbose: ctx.verbose
      })

      if (output) {
        fs.writeFileSync(output, source, { encoding: 'utf8' })
      } else {
        console.log(source)
      }
    })
}
