const fs = require('fs')
const path = require('path')
const FireScript = require('../src/app')

module.exports = (supershit) => {
  return supershit
    .cmd('mkastfile <slug>')
    .description('Creates an AST file from <input>')
    .option('-c, --allow-comments', 'Allow comments')
    .action((ctx, slug) => {
      const srcPath = path.join(__dirname, '../', slug, 'index.js')
      const astPath = path.join(__dirname, '../', slug, 'ast.json')

      const jsSource = fs.readFileSync(srcPath, { encoding: 'utf8' })
      const ast = FireScript.parse(jsSource, {
        type: 'js',
        comments: ctx.allowComments
      })

      fs.writeFileSync(astPath, JSON.stringify(ast, null, '  '))
    })
}
