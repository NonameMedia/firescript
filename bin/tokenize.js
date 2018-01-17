const fs = require('fs')
const FireScript = require('../src/app')

module.exports = (supershit) => {
  return supershit
    .cmd('tokenize <file>')
    .option('-j,--js', 'Format as JS instead of JSON')
    .option('-l,--location', 'Show location')
    .option('-v,--verbose', 'Verbose log')
    .action((ctx, file) => {
      const source = fs.readFileSync(file, { encoding: 'utf8' })
      const tokenStack = FireScript.tokenize(source)
      const lines = []
      tokenStack.forEach((token) => {
        const keyQuote = ctx.js ? '' : '"'
        const valueQuote = ctx.js ? '\'' : '"'

        const str = []
        str.push(`${keyQuote}type${keyQuote}: ${valueQuote}${token.type}${valueQuote}`)
        str.push(`${keyQuote}value${keyQuote}: ${valueQuote}${token.value}${valueQuote}`)
        lines.push(`{ ${str.join(', ')} }`)
      })

      if (ctx.verbose) {
        console.log()
      }
      console.log(lines.join(',\n'))
    })
}
