const fs = require('fs')
const path = require('path')
const FireScript = require('../src/app')

module.exports = (supershit) => {
  return supershit
    .cmd('mkastfile <slug>')
    .action((ctx, slug) => {
      const srcPath = path.join(__dirname, '../', slug, 'index.js')
      const astPath = path.join(__dirname, '../', slug, 'ast.json')

      const jsSource = fs.readFileSync(srcPath, { encoding: 'utf8' })
      const ast = FireScript.parse(jsSource, {
        type: 'js'
      })

      fs.writeFileSync(astPath, JSON.stringify(ast, null, '  '))
    })
}
