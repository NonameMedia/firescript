const fs = require('fs')
const Firescript = require('../src/app')

module.exports = (fireio) => {
  return fireio
    .cmd('tokenize <file>')
    .option('-j,--js', 'Format as JS instead of JSON')
    .option('-l,--location', 'Show location')
    .option('-v,--verbose', 'Verbose log')
    .description('Tokenize a .fire or .js file')
    .action((ctx, file) => {
      const source = fs.readFileSync(file, { encoding: 'utf8' })
      const tokenStack = Firescript.tokenize(source)
      const lines = []
      tokenStack.forEach((token) => {
        const keyQuote = ctx.js ? '' : '"'
        const typeQuote = ctx.js ? '\'' : '"'
        const isNonLiteral =
          typeof token.value === 'number' ||
          typeof token.value === 'undefined' ||
          typeof token.value === 'boolean' ||
          token.value === null
        const valueQuote = isNonLiteral ? '' : ctx.js ? '\'' : '"'

        const str = []
        str.push(`${keyQuote}type${keyQuote}: ${typeQuote}${token.type}${typeQuote}`)
        str.push(`${keyQuote}value${keyQuote}: ${valueQuote}${token.value}${valueQuote}`)
        lines.push(`{ ${str.join(', ')} }`)
      })

      if (ctx.verbose) {
        console.log()
      }
      console.log(lines.join(',\n'))
    })
}
