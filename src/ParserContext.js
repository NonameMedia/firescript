class ParserContext {
  constructor (opts) {
    this.setLocation = opts.setLocation || false
    this.setRange = opts.setRange || false
  }
}

module.exports = ParserContext
