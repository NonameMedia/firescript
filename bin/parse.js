const fs = require('fs')
const path = require('path')
const FirescriptParser = require('firescript-parser').FirescriptParser
const esprima = require('esprima')

module.exports = (fireio) => {
  return fireio
    .cmd('parse <file> [output]')
    .option('-c, --comments', 'Include comments')
    .option('-v, --verbose', 'Verbose log')
    .option('-l, --location', 'Add location')
    // .option('-r, --range', 'Add range')
    .description('Parse a .fire or .js file into an AST tree')
    .action((ctx, file, output) => {
      const fsSource = fs.readFileSync(file, { encoding: 'utf8' })
      if (path.extname(file) === '.fire') {
        const parser = new FirescriptParser()
        const ast = parser.parse(fsSource, {
          type: 'fire',
          includeComments: ctx.comments,
          setLocation: !!ctx.location,
          setRange: !!ctx.range,
          filename: file
        })

        const source = JSON.stringify(ast, null, '  ')

        if (output) {
          fs.writeFileSync(output, source, { encoding: 'utf8' })
        } else {
          console.log(source)
        }
      } else if (path.extname(file) === '.js') {
        const ast = esprima.parseModule(fsSource, {
          loc: !!ctx.location,
          range: !!ctx.range,
          comment: ctx.comments,
          filename: file
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
