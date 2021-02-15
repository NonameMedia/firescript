const path = require('path')
const colorfy = require('colorfy')
const fs = require('fs').promises
const FirescriptConfig = require('firescript-config').FirescriptConfig

const pkg = require('../package.json')

module.exports = (fireio) => {
  return fireio
    .cmd('clean')
    .option('-v, --verbose', 'Verbose log')
    .description('Remove build dir')
    .action(async (ctx, src, dest) => {
      try {
        const config = new FirescriptConfig({
          build: {
            srcDir: src,
            destDir: dest
          }
        })

        const cf = colorfy()

        const buildConfig = config.getConfig('build')
        if (ctx.verbose) {
          cf.grey('Remove build dir: ').txt(buildConfig.destDir).nl().print()
        }

        await fs.rmdir(buildConfig.destDir, {
          recursive: true
        })
      } catch (err) {
        console.log(ctx.verbose ? err.stack : err.toString())
        process.exit(1)
      }
    })
}
