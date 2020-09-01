const { FirescriptParser } = require('firescript-parser')
const { FirescriptLinter } = require('firescript-linter')
const { JavascriptTranspiler } = require('firescript-transpiler')

const path = require('path')
const SuperFS = require('superfs')

class FirescriptBuilder {
  constructor (opts) {
    this.files = new Map()
    this.srcDir = opts.srcDir
    this.destDir = opts.destDir
    this.conf = opts.conf
  }

  addFile (filename, source) {
    this.files.set(filename, {
      source
    })
  }

  async parse () {
    for (const [filename, item] of this.files) {
      // console.log('Parse', filename)
      const parser = new FirescriptParser()
      item.fst = await parser.parse(item.source)
    }
  }

  async lint () {
    for (const [filename, item] of this.files) {
      // console.log('Lint', filename)
      const linter = new FirescriptLinter()
      item.lint = linter.lint(item.fst)
    }
  }

  async transpile () {
    for (const [filename, item] of this.files) {
      console.log('Transpile', filename)
      const transpiler = new JavascriptTranspiler({
        features: this.conf.features
      })
      item.transpiled = transpiler.transpile(item.fst)
      item.destFile = path.join(this.destDir, path.relative(this.srcDir, filename).replace(/\.fire$/, '.js'))
    }
  }

  async writefiles () {
    for (const [filename, item] of this.files) {
      // item.destFile = path.join(this.destDir, path.relative(this.srcDir, filename))
      console.log('Write file:', filename, item, item.destFile)
      await SuperFS.writeFile(item.destFile, item.transpiled, { encoding: 'utf8' })
    }
  }

  async build (srcDir, distDir) {
    await this.parse()
    await this.lint()
    await this.transpile()
    await this.writefiles()
  }

  async copy (srcPatterns, srcDir, distDir) {
    const files = srcPatterns.lenght ? await SuperFS.readDir(srcDir, {
      filter: srcPatterns,
      recursive: true,
      ignore: [
        'node_modules',
        '.git'
      ]
    }) : []

    console.log('Files:', files)
  }
}

module.exports.FirescriptBuilder = FirescriptBuilder
