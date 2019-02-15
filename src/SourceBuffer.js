class SourceBuffer {
  constructor () {
    this.buffer = []
    this.locationMap = []
    this.line = 1
    this.column = 1
    this.indention = 0
    this.indentionSize = 2
  }

  write (str, defaultValue) {
    if (!str) {
      if (defaultValue) {
        this.write(defaultValue)
      }

      return this
    }

    if (typeof str === 'object') {
      str.compile(this)
      return this
    }

    const lastIndex = str.lastIndexOf('\n')
    if (lastIndex === -1) {
      this.column += str.length
    } else {
      this.column += str.length - lastIndex - 1
      this.line += (str.split('\n').length - 1)
    }

    this.buffer.push(str)
    return this
  }

  nl (num = 1) {
    this.line += num
    this.column = 1

    this.buffer.push('\n'.repeat(num))
    return this
  }

  getLocation () {
    return [ this.line, this.column ]
  }
  //
  // indent (size, noReturn) {
  //   this.line += 1
  //   this.column = 0
  //
  //   size = size || 0
  //   this.indention += size
  //   this.write(noReturn ? '\n' : '\n' + ' '.repeat(this.indention * this.indentionSize))
  // }

  getIndent () {
    return '\n' + ' '.repeat(this.indention * this.indentionSize)
  }

  indent (size) {
    this.line += 1
    this.column = 1

    size = size || 0
    this.indention += size
    this.write(this.getIndent())
  }

  item (node) {
    node.compile(this)
    return this
  }

  loop (arr, joiner = '') {
    if (arr) {
      arr.forEach((item, index) => {
        if (index) {
          this.write(joiner)
        }

        item.compile(this)
      })
    }

    return this
  }

  registerItem (origLocation, name) {
    if (origLocation) {
      const map = [
        origLocation[0],
        origLocation[1] + 1
      ].concat(this.getLocation())

      if (name) {
        map.push(name)
      }

      this.locationMap.push(map)
    }

    return this
  }

  toString () {
    return this.buffer.join('')
  }
}

module.exports = SourceBuffer
