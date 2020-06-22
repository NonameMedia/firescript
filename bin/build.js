const path = require('path')
const colorfy = require('colorfy')
const SuperFS = require('superfs')
const Firescript = require('../src/app')
const FirescriptBuilder = require('../src/FirescriptBuilder').FirescriptBuilder
const copy = require('./copy').copy

const IGNORE_FILES = [
  'node_modules'
]

class BuildCMD {
  constructor (conf) {
    this.conf = conf
  }

  async transpile () {
    const files = await SuperFS.readDir(this.srcDir, {
      recursive: true,
      ignore: this.getIgnoreFiles()
    })

    const fsFiles = files.filter((flw) => flw.ext === 'fire')
    const cf = colorfy()

    try {
      const builder = new FirescriptBuilder({
        srcDir: this.srcDir,
        destDir: this.destDir
      })

      for (const flw of fsFiles) {
        // console.log('ADD FILE', fsFiles)
        builder.addFile(flw.path, await SuperFS.readFile(flw.path))
        // console.log('BUILDER', builder, this.srcDir, this.destDir)
      }

      await builder.build()
      for (const [filename, item] of builder.files) {
        cf.yellow('Transpile: ')
          .grey(path.relative(this.srcDir, filename))
          .txt(' to ')
          .grey(path.relative(this.srcDir, item.destFile))
          .print()
      }
    } catch (err) {
      cf.txt('Build Error: ').txt(err.stack).print()
    }
  }

  getIgnoreFiles () {
    return IGNORE_FILES.concat(this.conf.ignore || [], this.destDir)
  }
}

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

      const buildCMD = new BuildCMD(conf)
      buildCMD.srcDir = path.resolve(process.cwd(), conf.src)
      buildCMD.destDir = path.resolve(process.cwd(), conf.dest)

      // await copy()
      await buildCMD.transpile()

      console.log(`Build directory '${buildCMD.srcDir}' ...`)

      if (conf.binSrc) {
        const binDest = conf.binDest || path.join(buildCMD.destDir, 'bin')

        const binBuildCMD = new BuildCMD(conf)
        binBuildCMD.srcDir = path.resolve(process.cwd(), conf.binSrc)
        binBuildCMD.destDir = path.resolve(process.cwd(), binDest)

        await binBuildCMD.transpile()

        console.log('Build bin dir to', binDest)
      }
    })
}
