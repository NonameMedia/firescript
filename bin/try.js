const Firescript = require('../src/app')
const fsDump = require('../src/utils/fsDump')

module.exports = (supershit) => {
  return supershit
    .cmd('try <code>')
    .option('-c,--comments', 'Include comments')
    .option('-v,--verbose', 'Verbose log')
    .description('Tries to parse <code> as Firescript and outputs the result in i readable format')
    .action((ctx, code) => {
      console.log('CODE:', code)

      const ast = Firescript.parse(code, {
        type: 'fire',
        includeComments: ctx.comments,
        sourceType: 'snippet'
      })

      fsDump(ast)
    })
}
