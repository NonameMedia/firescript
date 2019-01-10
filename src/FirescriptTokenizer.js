const Token = require('./tokenizer/Token')
const TokenStack = require('./TokenStack')

class FirescriptTokenizer {
  constructor (opts) {
    opts = opts || {}
    this.setRange = opts.range || false
    this.setLocation = opts.loc || false
    this.indentionSize = opts.indentionSize || 2
  }

  tokenize (source) {
    const opts = {
      setRange: this.setRange,
      setLocation: this.setLocation
    }

    const token = new Token(opts)
    const stack = token.next(source)
    const tokenStack = new TokenStack(stack)
    tokenStack.indentionSize = this.indentionSize
    return tokenStack
  }
}

module.exports = FirescriptTokenizer
