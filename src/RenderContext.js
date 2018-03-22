class RenderContext {
  constructor () {
    this.__indention = 0
    this.indentionSize = 2
  }

  indent (size) {
    size = size || 0
    this.__indention += size
    return '\n' + ' '.repeat(this.__indention * this.indentionSize)
  }

  join (arr, joiner) {
    return arr.map((item) => item.toESString(this)).join(joiner)
  }
}

module.exports = RenderContext
