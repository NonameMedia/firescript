const path = require('path')
const colorfy = require('colorfy')
const SuperFS = require('superfs')
const FireScript = require('../src/app')
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
      cf.ored(' ... skipping file ').lgrey(filename).print()
      return
    }

    const infile = path.resolve(srcDir, filename)
    const outfile = path.resolve(destDir, filename.replace(/\.fire$/, '.js'))

    // cf.yellow(' ... write file ').lgrey(outfile).print()
    cf.txt('transpile ').grey(infile).txt(' -> ').lime(outfile).nl().print()

    const input = await SuperFS.readFile(infile)

    const source = FireScript.transpile(input, {
      type: 'fire',
      verbose: true
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
    cf.txt('Transpile ').lime(String(fsFiles.length)).txt([' file from ', ' files from ', fsFiles.length]).grey(this.srcDir).txt(' to ').lime(this.destDir).nl().print()

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
    .cmd('build [src] [dest]')
    .option('-v, --verbose', 'Verbose log')
    .description('Build project')
    .action(async (ctx, src, dest) => {
      const conf = FireScript.loadConf({
        src: src,
        dest: dest
      })

      const buildCMD = new BuildCMD(conf)
      buildCMD.srcDir = path.resolve(process.cwd(), conf.src)
      buildCMD.destDir = path.resolve(process.cwd(), conf.dest)

      // console.log('CONF', conf)
      await copy()
      await buildCMD.transpile()

      console.log(`Build directory '${buildCMD.srcDir}' ...`)
    })
}
