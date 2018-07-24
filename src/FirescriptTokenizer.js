const Token = require('./tokenizer/Token')
const TokenStack = require('./TokenStack')

class FireSciptTokenizer {
  constructor (opts) {
    opts = opts || {}
    this.setRange = opts.range || false
    this.setLocation = opts.loc || false
  }

  tokenize (source) {
    const opts = {
      setRange: this.setRange,
      setLocation: this.setLocation
    }

    const token = new Token(opts)
    const stack = token.next(source)
    return new TokenStack(stack)
  }
}

module.exports = FireSciptTokenizer
