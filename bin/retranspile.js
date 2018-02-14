const fs = require('fs')
const FireScript = require('../src/app')

module.exports = (supershit) => {
  return supershit
    .cmd('retranspile <file>')
    .option('-v,--verbose', 'Verbose log')
    .action((ctx, file) => {
      const jsSource = fs.readFileSync(file, { encoding: 'utf8' })
      const fsSource = FireScript.retranspile(jsSource)
      console.log(fsSource)
    })
}
