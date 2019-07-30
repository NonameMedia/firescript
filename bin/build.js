const path = require('path')
const colorfy = require('colorfy')
const SuperFS = require('superfs')
const Firescript = require('../src/app')
const copy = require('./copy').copy

const IGNORE_FILES = [
  'node_modules'
]

class BuildCMD {
  constructor (conf) {
    this.conf = conf
  }

  async transpileFile (filename, srcDir, destDir) {
    const cf = colorfy()
    if (path.extname(filename) !== '.fire') {
      cf.ored('Skipping file ').lgrey(filename).print()
      return
    }

    const infile = path.resolve(srcDir, filename)
    const outfile = path.resolve(destDir, filename.replace(/\.fire$/, '.js'))
    const infileRelative = infile.replace(process.cwd(), '.')
    const outfileRelative = outfile.replace(process.cwd(), '.')

    cf.txt('Transpile ').grey(infileRelative).txt(' -> ').lime(outfileRelative).print()

    const input = await SuperFS.readFile(infile)

    const source = Firescript.transpile(input, {
      type: 'fire',
      verbose: this.conf.verbose,
      filename: infile
    })

    const fl = await SuperFS.writeFile(outfile, source, { encoding: 'utf8' })
    return fl
  }

  async transpile () {
    const files = await SuperFS.readDir(this.srcDir, {
      recursive: true,
      ignore: this.getIgnoreFiles()
    })
    const fsFiles = files.filter((flw) => flw.ext === 'fire')
    const cf = colorfy()
    cf.txt('Transpile ').lime(String(fsFiles.length)).txt([' file from ', ' files from ', fsFiles.length]).grey(this.srcDir).txt(' to ').lime(this.destDir).print()

    for (const flw of fsFiles) {
      await this.transpileFile(flw.relative, this.srcDir, this.destDir)
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

      // console.log('CONF', conf)

      await copy()
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
