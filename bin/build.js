const path = require('path')
const colorfy = require('colorfy')
const FirescriptBuilder = require('firescript-builder').FirescriptBuilder
const FirescriptConfig = require('firescript-config').FirescriptConfig

const pkg = require('../package.json')

module.exports = (fireio) => {
  return fireio
    .cmd('build [src] [dest]')
    .option('-v, --verbose', 'Verbose log')
    .description('Build project')
    .action(async (ctx, src, dest) => {
      try {
        const config = new FirescriptConfig({
          build: {
            srcDir: src,
            destDir: dest
          }
        })

        const buildConf = config.getConfig('build')
        const builder = new FirescriptBuilder({
          srcDir: buildConf.srcDir,
          destDir: buildConf.destDir,
          features: config.getConfig('features')
        })

        const cf = colorfy()

        cf.txt('Firescript: ')
          .yellow(`v${pkg.version}`)
          .nl()
          .print()

        if (ctx.verbose) {
          cf.grey('Build source files:').nl()
            .txt('srcDir: ').grey(buildConf.srcDir).nl()
            .txt('destDir: ').grey(buildConf.destDir).nl().print()
        }

        const buildFiles = await builder.build()
        for (const fl of buildFiles) {
          cf.yellow('Build: ')
            .grey(path.relative(process.cwd(), fl.sourceFile))
            .txt(' to ')
            .grey(path.relative(process.cwd(), fl.path))
            .print()
        }

        if (buildConf.binDir) {
          const destDir = path.join(buildConf.destDir, path.relative(process.cwd(), path.resolve(process.cwd(), buildConf.binDir)))

          if (ctx.verbose) {
            cf.grey('Build bin files:').nl()
              .txt('binDir: ').grey(buildConf.binDir).nl()
              .txt('destDir: ').grey(destDir).nl().print()
          }

          const buildBinFiles = await builder.build(buildConf.binDir, destDir)
          for (const fl of buildBinFiles) {
            cf.yellow('Build: ')
              .grey(path.relative(process.cwd(), fl.sourceFile))
              .txt(' to ')
              .grey(path.relative(process.cwd(), fl.path))
              .print()
          }
        }

        if (ctx.verbose) {
          cf.grey('Copy source files:').nl()
            .txt('copyFiles: ').grey(JSON.stringify(buildConf.copyFiles, null, '  ')).print()
        }

        const copyFiles = await builder.copy(buildConf.copyFiles)
        for (const fl of copyFiles) {
          cf.ored('Copy: ')
            .grey(path.relative(process.cwd(), fl.path))
            .txt(' to ')
            .grey(path.join(buildConf.destDir, fl.relative))
            .print()
        }

        await builder.setPkgFlags({
          firescript: pkg.version
        })
      } catch (err) {
        console.log(ctx.verbose ? err.stack : err.toString())
        process.exit(1)
      }
    })
}
