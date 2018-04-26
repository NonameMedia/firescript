const fs = require('fs')
const path = require('path')
const FireScript = require('../src/app')

module.exports = (supershit) => {
  return supershit
    .cmd('mkastfile <slug> [outfile]')
    .description('Creates an AST file from <input>')
    .option('-c, --allow-comments', 'Allow comments')
    .action((ctx, slug, outfile) => {
      let inFile = 'index.js'
      if (/\.js/.test(slug)) {
        inFile = path.basename(slug)
        slug = path.dirname(slug)
      }

      const srcPath = path.join(__dirname, '../', slug, inFile)
      const astPath = path.join(__dirname, '../', slug, outfile || 'ast.json')

      const jsSource = fs.readFileSync(srcPath, { encoding: 'utf8' })
      const ast = FireScript.parse(jsSource, {
        type: 'js',
        comments: ctx.allowComments
      })

      fs.writeFileSync(astPath, JSON.stringify(ast, null, '  '))
    })
}
