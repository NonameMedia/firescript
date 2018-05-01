class RenderContext {
  constructor (features, type) {
    this.__indention = 0
    this.indentionSize = 2
    Object.assign(this, features)
    this.renderMethod = type === 'fire' ? 'toFSString' : 'toESString'
  }

  indent (size, noReturn) {
    size = size || 0
    this.__indention += size
    return noReturn ? '\n' : '\n' + ' '.repeat(this.__indention * this.indentionSize)
  }

  join (arr, joiner) {
    return arr.map((item) => item[this.renderMethod](this)).join(joiner)
  }

  each (arr, fn, joiner) {
    return arr.map((item, index, arr) => fn(item[this.renderMethod](this), item, index, arr)).join(joiner)
  }
}

module.exports = RenderContext
