const esprima = require('esprima')

class JSParser {
  constructor (opts = {}) {
    this.setLocation = !!opts.setLocation
    this.setRange = !!opts.setRange
    this.comments = !!opts.comments
  }

  parse (str) {
    return esprima.parseModule(str, {
      loc: this.setLocation,
      range: this.setRange,
      comment: this.comments
    })
  }
}

module.exports = JSParser
