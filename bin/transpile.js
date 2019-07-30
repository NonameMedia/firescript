const fs = require('fs')
const path = require('path')
const Firescript = require('../src/app')

module.exports = (fireio) => {
  return fireio
    .cmd('transpile <file> [output]')
    .description('Read a file and transpiles it into FireScipt or Javascript')
    .option('-v,--verbose', 'Verbose log')
    .option('-t,--type <type>', 'Set the source type. (fire|js)')
    .option('-l, --location', 'Add location')
    .action((ctx, file, output) => {
      file = path.resolve(process.cwd(), file)
      const input = path.extname(file) === '.json'
        ? require(file)
        : fs.readFileSync(file, { encoding: 'utf8' })

      const source = Firescript.transpile(input, {
        type: /* ctx.type || */ path.extname(file) === '.fire' ? 'fire' : 'js',
        setLocation: !!ctx.location,
        verbose: ctx.verbose,
        filename: file
      })

      if (output) {
        fs.writeFileSync(output, source, { encoding: 'utf8' })
      } else {
        console.log(source)
      }
    })
}
