const Mocha = require('mocha')
const inspect = require('inspect.js')
const firescript = require('../src/app')
const superfs = require('superfs')
const EventEmitter = require('events')

require('../src/register')

class FireTest extends EventEmitter {
  constructor (opts) {
    super()
    this.mocha = new Mocha()
    this.mocha.reporter('lagoon-reporter')
    this.mocha.useInlineDiffs(true)
    this.mocha.suite.timeout(2000)
    this.filePatterns = opts.files || ['tests/**/*.spec.fire', 'tests/**/*.spec.js']
    this.workingDir = process.cwd()
    this.files = []
    this.verbose = opts.verbose

    if (opts.grep) {
      this.mocha.grep(opts.grep)
    }

    if (opts.bail) {
      this.mocha.bail()
    }

    if (opts.fgrep) {
      this.mocha.fgrep(opts.fgrep)
    }

    if (opts.invert) {
      this.mocha.invert()
    }

    if (opts.checkLeaks) {
      this.mocha.checkLeaks()
    }

    if (opts.fullTrace) {
      this.mocha.fullTrace()
    }

    // this.mocha.globals(globals)

    process.nextTick(() => this.init())
  }

  add (file) {
    this.files.push(file)
    this.emit('file:add', file)
  }

  async init () {
    const fls = await superfs.readDir(this.workingDir, {
      filter: this.filePatterns,
      recursive: true,
      ignore: 'node_modules'
    })

    fls.forEach((fl) => {
      if (fl.isFile) {
        this.add(fl.path)
      }
    })

    this.files.sort()
    this.initDone = true
    this.emit('runner:init', this)
  }

  async run () {
    if (!this.initDone) {
      this.once('runner:init', () => this.run())
      return
    }

    this.mocha.files = this.files
    const runner = this.mocha.run()
    runner.on('end', () => {
      this.emit('runner:end')
      if (runner.failures === 0) {
        this.emit('runner:success')
      } else {
        this.emit('runner:fail')
      }
    })
  }
}

module.exports.FireTest = FireTest
