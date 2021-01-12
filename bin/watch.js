const path = require('path')
const colorfy = require('colorfy')
const SuperFS = require('superfs')
const FirescriptConfig = require('firescript-config').FirescriptConfig
const Firescript = require('../src/app')
const copy = require('./copy').copy

const IGNORE_FILES = [
  'node_modules'
]

class WatchCMD {
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

    cf.txt('Compile ').grey(infileRelative).txt(' -> ').lime(outfileRelative).print()

    const input = await SuperFS.readFile(infile)

    const source = Firescript.transpile(input, {
      type: 'fire',
      filename: infile
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

module.exports = (fireio) => {
  return fireio
    .cmd('watch [src] [dest]')
    .option('-v, --verbose', 'Verbose log')
    .description('Watch a directory and starts transpilation if a files content changes')
    .action(async (ctx, src, dest) => {
      const config = new FirescriptConfig({
        build: {
          srcDir: src,
          destDir: dest
        }
      })

      const watchCmd = new WatchCMD()
      watchCmd.srcDir = path.resolve(process.cwd(), config.srcDir)
      watchCmd.destDir = path.resolve(process.cwd(), config.destDir)

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
