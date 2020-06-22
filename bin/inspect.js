const fs = require('fs')
const path = require('path')
const colorfy = require('colorfy')
// const Firescript = require('../src/app')
const FirescriptParser = require('firescript-parser').FirescriptParser
const FirescriptLinter = require('../../firescript-linter').FirescriptLinter

module.exports = (fireio) => {
  return fireio
    .cmd('inspect')
    .description('Inspects a .fire module')
    .option('-f, --from <str>', 'Module name')
    .option('-i, --instance <str>', 'Call instance of <str>')
    .option('-m, --method <str>', 'Call method of <str>')
    .option('-f, --function <str>', 'Call function of <str>')
    .action(async (ctx) => {
      console.log('CTX', ctx)
      const session = {}
      if (ctx.from) {
        const moduleFile = path.resolve(process.cwd(), ctx.from)
        const fsSource = fs.readFileSync(moduleFile, { encoding: 'utf8' })
        try {
          const parser = new FirescriptParser()
          session.ast = parser.parse(fsSource)
        } catch (err) {
          console.log('Parse Error', err)
        }
      }

      if (ctx.instance) {
        console.log('Create Instance from', ctx.instance)
        session.instance = new session.module[ctx.instance]()
      }

      if (ctx.method) {
        console.log('Call method', ctx.method)
        session.return = session.instance[ctx.method]()
      }

      console.log('SESSION:', session)
    })
}
