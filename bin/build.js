const path = require('path')
const colorfy = require('colorfy')
const Firescript = require('../src/app')
const FirescriptBuilder = require('firescript-builder').FirescriptBuilder

const pkg = require('../package.json')

module.exports = (fireio) => {
  return fireio
    .cmd('build [src] [dest]')
    .option('-v, --verbose', 'Verbose log')
    .description('Build project')
    .action(async (ctx, src, dest) => {
      const conf = Firescript.loadConf({
        src: src,
        dest: dest,
        verbose: ctx.verbose
      })

      const builder = new FirescriptBuilder({
        srcDir: conf.src,
        destDir: conf.dest,
        features: conf.features
      })

      // console.log('Conf:', conf)
      // console.log('Builder:', builder)

      const cf = colorfy()

      cf.txt('Firescript: ')
        .yellow(`v${pkg.version}`)
        .nl()
        .print()

      if (conf.verbose) {
        cf.grey('Run build tasks:').nl()
          .txt('srcDir: ').grey(conf.src).nl()
          .txt('destDir: ').grey(conf.dest).nl().print()
      }

      const buildFiles = await builder.build()
      for (const fl of buildFiles) {
        cf.yellow('Build: ')
          .grey(path.relative(process.cwd(), fl.sourceFile))
          .txt(' to ')
          .grey(path.relative(process.cwd(), fl.path))
          .print()
      }

      if (conf.verbose) {
        cf.grey('Run copy tasks:').nl()
          .txt('copyFiles: ').grey(JSON.stringify(conf.copy, null, '  ')).print()
      }

      const copyFiles = await builder.copy(conf.copy)
      for (const fl of copyFiles) {
        cf.ored('Copy:  ')
          .grey(path.relative(process.cwd(), fl.path))
          .txt(' to ')
          .grey(path.join(conf.dest, fl.relative))
          .print()
      }

      await builder.setPkgFlags({
        firescript: pkg.version
      })

      // const buildCMD = new BuildCMD(conf)
      // buildCMD.srcDir = path.resolve(process.cwd(), conf.src)
      // buildCMD.destDir = path.resolve(process.cwd(), conf.dest)
      // console.log('CONF', conf, buildCMD)

      // await copy()
      // await buildCMD.transpile()

      // console.log(`Build directory '${buildCMD.srcDir}' ...`)

      // if (conf.binSrc) {
      // const binDest = conf.binDest || path.join(buildCMD.destDir, 'bin')

      // const binBuildCMD = new BuildCMD(conf)
      // binBuildCMD.srcDir = path.resolve(process.cwd(), conf.binSrc)
      // binBuildCMD.destDir = path.resolve(process.cwd(), binDest)

      // await binBuildCMD.transpile()

      // console.log('Build bin dir to', binDest)
      // }
    })
}
