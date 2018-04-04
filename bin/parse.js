const fs = require('fs')
const path = require('path')
const FireScript = require('../src/app')

module.exports = (supershit) => {
  return supershit
    .cmd('parse <file> [output]')
    .option('-v,--verbose', 'Verbose log')
    .action((ctx, file, output) => {
      const fsSource = fs.readFileSync(file, { encoding: 'utf8' })
      if (path.extname(file) === '.fire') {
        const ast = FireScript.parse(fsSource, {
          type: 'fire'
        })

        const source = JSON.stringify(ast, null, '  ')

        if (output) {
          fs.writeFileSync(output, source, { encoding: 'utf8' })
        } else {
          console.log(source)
        }
      } else if (path.extname(file) === '.js') {
        const ast = FireScript.parse(fsSource, {
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
