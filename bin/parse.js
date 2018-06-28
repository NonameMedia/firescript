const fs = require('fs')
const path = require('path')
const Firescript = require('../src/app')

module.exports = (supershit) => {
  return supershit
    .cmd('parse <file> [output]')
    .option('-v,--verbose', 'Verbose log')
    .description('Parse a .fire or .js file into an AST tree')
    .action((ctx, file, output) => {
      const fsSource = fs.readFileSync(file, { encoding: 'utf8' })
      if (path.extname(file) === '.fire') {
        const ast = Firescript.parse(fsSource, {
          type: 'fire'
        })

        const source = JSON.stringify(ast, null, '  ')

        if (output) {
          fs.writeFileSync(output, source, { encoding: 'utf8' })
        } else {
          console.log(source)
        }
      } else if (path.extname(file) === '.js') {
        const ast = Firescript.parse(fsSource, {
          type: 'js'
        })

        const source = JSON.stringify(ast, null, '  ')

        if (output) {
          fs.writeFileSync(output, source, { encoding: 'utf8' })
        } else {
          console.log(source)
        }
      }
    })
}
