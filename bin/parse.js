const fs = require('fs')
const path = require('path')
const Firescript = require('../src/app')

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
        const ast = Firescript.parse(fsSource, {
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
        const ast = Firescript.parse(fsSource, {
          type: 'js',
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
      }
    })
}
