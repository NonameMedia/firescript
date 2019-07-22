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
      this.column = str.length - lastIndex
      this.line += (str.split('\n').length - 1)
    }

    this.buffer.push(str)
    return this
  }

  writeComments (comments) {
    if (comments && comments.length > 0) {
      comments.forEach((comment) => {
        // console.log('COMMENT', comment)
        this.write(comment)
      })
    }
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

  indent (size, noWrite) {
    size = size || 0
    this.indention += size

    if (!noWrite) {
      this.write(this.getIndent())
    }
  }

  item (node) {
    node.compile(this)
    return this
  }

  loop (arr, joiner = '', fn) {
    if (arr) {
      arr.forEach((item, index) => {
        if (item.leadingComments) {
          this.write(item.renderLeadingComments())
        }

        if (item.innerComments) {
          this.write(item.renderInnerComments())
        }

        if (index) {
          this.write(joiner)
        }

        item.compile(this)

        if (item.trailingComments) {
          this.write(item.renderTrailingComments())
        }

        if (fn && fn(item, arr[index + 1])) {
          this.nl()
        }
      })
    }

    return this
  }

  registerItem (origLocation, name) {
    if (origLocation) {
      const map = [
        origLocation.line,
        origLocation.column,
        this.line,
        this.column
      ]

      if (typeof name === 'string') {
        map.push(name)
      }

      this.locationMap.push(map)
    }

    return this
  }

  toString () {
    return this.buffer.join('')
  }

  createLocationMap () {
    if (this.locationMap.length === 0) {
      return
    }

    this.write('module.exports.__fsLocationMap = [')
    this.write(this.locationMap.map((item) => {
      const args = item.slice(0, 4)
      if (item[4]) {
        args.push(`'${item[4].replace(/'/g, '\\\'')}'`)
      }

      return `[${args.join(', ')}]`
    }).join(', '))

    this.write('];')
  }
}

module.exports = SourceBuffer
