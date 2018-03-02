const fs = require('fs')
const path = require('path')
const FireScript = require('../src/app')

module.exports = (supershit) => {
  return supershit
    .cmd('parse <file>')
    .option('-v,--verbose', 'Verbose log')
    .action((ctx, file) => {
      const fsSource = fs.readFileSync(file, { encoding: 'utf8' })
      if (path.extname(file) === '.fire') {
        const ast = FireScript.parse(fsSource, {
          type: 'fire'
        })
        console.log(JSON.stringify(ast, null, '  '))
      } else if (path.extname(file) === '.js') {
        const ast = FireScript.parse(fsSource, {
          type: 'js'
        })
        console.log(JSON.stringify(ast, null, '  '))
      }
    })
}
