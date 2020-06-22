const FirescriptParser = require('firescript-parser').FirescriptParser
const fsDump = require('../src/utils/fsDump')

module.exports = (fireio) => {
  return fireio
    .cmd('try <code>')
    .option('-c,--comments', 'Include comments')
    .option('-v,--verbose', 'Verbose log')
    .description('Tries to parse <code> as Firescript and outputs the result in readable format')
    .action((ctx, code) => {
      const parser = new FirescriptParser()
      const ast = parser.parse(code, {
        type: 'fire',
        includeComments: ctx.comments,
        sourceType: 'snippet'
      })

      fsDump(ast)
    })
}
