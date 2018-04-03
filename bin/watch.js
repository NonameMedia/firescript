const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const FireScript = require('../src/app')

function transpileFile (filename, srcDir, destDir) {
  if (path.extname(filename) !== '.fire') {
    console.log(` ... skipping file ${filename}`)
    return
  }

  mkdirp.sync(destDir)

  const infile = path.resolve(srcDir, filename)
  const outfile = path.resolve(destDir, filename.replace(/\.fire$/, '.js'))

  console.log(' ... write file', outfile)
  // file = path.resolve(process.cwd(), file)
  const input = fs.readFileSync(infile, { encoding: 'utf8' })

  const source = FireScript.transpile(input, {
    type: 'fire'
  })

  fs.writeFileSync(outfile, source, { encoding: 'utf8' })
}

module.exports = (supershit) => {
  return supershit
    .cmd('watch <dir> [destDir]')
    .option('-v, --verbose', 'Verbose log')
    .action((ctx, dir, destDir) => {
      const srcDir = path.resolve(process.cwd(), dir)
      destDir = path.resolve(process.cwd(), destDir)
      const opts = {
        recursive: true
      }

      let locked = false
      fs.watch(srcDir, opts, (eventType, filename) => {
        if (locked) {
          return
        }

        console.log(` ... ${filename} changed`, eventType, filename)
        locked = true
        setTimeout(() => { locked = false }, 500)
        transpileFile(filename, srcDir, destDir)
      })

      console.log(`Watching directory '${srcDir}' ...`)
    })
}
