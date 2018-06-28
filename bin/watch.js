const path = require('path')
const colorfy = require('colorfy')
const SuperFS = require('superfs')
const Firescript = require('../src/app')
const copy = require('./copy').copy

const IGNORE_FILES = [
  'node_modules'
]

class WatchCMD {
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
      verbose: this.conf.verbose
    })

    const fl = await SuperFS.writeFile(outfile, source, { encoding: 'utf8' })
    return fl
  }

  async preTranspile () {
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

module.exports = (supershit) => {
  return supershit
    .cmd('watch [src] [dest]')
    .option('-v, --verbose', 'Verbose log')
    .description('Watch a directory and starts transpilation if a files content changes')
    .action(async (ctx, src, dest) => {
      const conf = Firescript.loadConf({
        src: src,
        dest: dest,
        verbose: ctx.verbose
      })

      const watchCmd = new WatchCMD(conf)
      watchCmd.srcDir = path.resolve(process.cwd(), conf.src)
      watchCmd.destDir = path.resolve(process.cwd(), conf.dest)

      // console.log('CONF', conf)
      await copy()
      await watchCmd.preTranspile()

      const watchHandler = (flw) => {
        // console.log('FLW', flw)
        const relative = path.relative(flw.dir, flw.path)
        watchCmd.transpileFile(path.join(relative, flw.changedFile), watchCmd.srcDir, watchCmd.destDir).then((res) => {
        }).catch((err) => {
          console.error('ERR', err)
        })
      }

      SuperFS.watch(watchCmd.srcDir, {
        ignore: watchCmd.getIgnoreFiles()
      }, watchHandler)

      console.log(`Watching directory '${watchCmd.srcDir}' ...`)
    })
}
