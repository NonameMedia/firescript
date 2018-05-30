const fs = require('fs')
const path = require('path')
const colorfy = require('colorfy')
const SuperFS = require('superfs')
const FireScript = require('../src/app')
const copy = require('./copy').copy

function transpileFile (filename, srcDir, destDir) {
  const cf = colorfy()
  if (path.extname(filename) !== '.fire') {
    cf.ored(' ... skipping file ').lgrey(filename).print()
    return
  }

  const infile = path.resolve(srcDir, filename)
  const outfile = path.resolve(destDir, filename.replace(/\.fire$/, '.js'))

  cf.yellow(' ... write file ').lgrey(outfile).print()

  const input = fs.readFileSync(infile, { encoding: 'utf8' })

  const source = FireScript.transpile(input, {
    type: 'fire'
  })

  SuperFS.writeFile(outfile, source, { encoding: 'utf8' })
}

module.exports = (supershit) => {
  return supershit
    .cmd('watch [src] [dest]')
    .option('-v, --verbose', 'Verbose log')
    .description('Watch a directory and starts transpilation if a files content changes')
    .action(async (ctx, src, dest) => {
      const conf = FireScript.loadConf({
        src: src,
        dest: dest
      })

      copy()
      console.log('CONF', conf)

      const srcDir = path.resolve(process.cwd(), conf.src)
      const destDir = path.resolve(process.cwd(), conf.dest)

      const watchHandler = (flw) => {
        console.log('FLW', flw)
        const relative = path.relative(flw.dir, flw.path)
        transpileFile(path.join(relative, flw.changedFile), srcDir, destDir)
      }

      SuperFS.watch(srcDir, watchHandler)

      console.log(`Watching directory '${srcDir}' ...`)
    })
}
