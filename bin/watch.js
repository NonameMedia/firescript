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

  // cf.yellow(' ... write file ').lgrey(outfile).print()
  cf.txt('transpile ').grey(infile).txt(' -> ').lime(outfile).nl().print()

  const input = fs.readFileSync(infile, { encoding: 'utf8' })

  const source = FireScript.transpile(input, {
    type: 'fire'
  })

  return SuperFS.writeFile(outfile, source, { encoding: 'utf8' })
}

async function preTranspile (src, dest) {
  const files = await SuperFS.readDir(src, { recursive: true })
  const fsFiles = files.filter((flw) => flw.ext === 'fire')
  const cf = colorfy()
  cf.txt('Transpile ').lime(String(fsFiles.length)).txt([' file from ', ' files from ', fsFiles.length]).grey(src).txt(' to ').lime(dest).nl().print()

  for (const flw of fsFiles) {
    await transpileFile(flw.relative, src, dest)
  }
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

      const srcDir = path.resolve(process.cwd(), conf.src)
      const destDir = path.resolve(process.cwd(), conf.dest)

      // console.log('CONF', conf)
      await copy()
      await preTranspile(srcDir, destDir)

      const watchHandler = (flw) => {
        // console.log('FLW', flw)
        const relative = path.relative(flw.dir, flw.path)
        transpileFile(path.join(relative, flw.changedFile), srcDir, destDir)
      }

      SuperFS.watch(srcDir, {
        ignore: [
          'node_modules',
          destDir
        ]
      }, watchHandler)

      console.log(`Watching directory '${srcDir}' ...`)
    })
}
