const fs = require('fs')
const FireScript = require('../src/app')

module.exports = (supershit) => {
  return supershit
    .cmd('transpile <file>')
    .option('-v,--verbose', 'Verbose log')
    .action((ctx, file) => {
      const fsSource = fs.readFileSync(file, { encoding: 'utf8' })
      const jsSource = FireScript.transpile(fsSource)
      console.log(jsSource)
    })
}
