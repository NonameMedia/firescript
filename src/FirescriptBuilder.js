const { FirescriptParser } = require('firescript-parser')
const { FirescriptLinter } = require('firescript-linter')
const { FirescriptTranspiler } = require('firescript-transpiler')

const path = require('path')
const SuperFS = require('superfs')

class FirescriptBuilder {
  constructor (opts) {
    this.files = new Map()
    this.srcDir = opts.srcDir
    this.destDir = opts.destDir
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

  lint () {
    for (const [filename, item] of this.files) {
      // console.log('Lint', filename)
      const linter = new FirescriptLinter()
      item.lint = linter.lint(item.fst)
    }
  }

  async transpile () {
    for (const [filename, item] of this.files) {
      // console.log('Transpile', filename)
      const transpiler = new FirescriptTranspiler()
      item.dist = await transpiler.transpile(item.fst)
    }
  }

  async writefiles () {
    for (const [filename, item] of this.files) {
      // console.log('Write file:', filename, item)
      item.destFile = path.join(this.destDir, path.relative(this.srcDir, filename))
      await SuperFS.writeFile(item.destFile, item.dist, { encoding: 'utf8' })
    }
  }

  async build (srcDir, distDir) {
    await this.parse()
    this.lint()
    await this.transpile()
    await this.writefiles()
  }
}

module.exports.FirescriptBuilder = FirescriptBuilder
