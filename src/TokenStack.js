class TokenStack extends Array {
  constructor (items) {
    typeof items === 'number' ? super(items) : super()

    if (Array.isArray(items)) {
      items.forEach((item) => this.push(item))
    }
    this.index = 0
  }

  next () {
    const token = this[this.index]
    if (!token) {
      return null
    }

    this.index += 1
    return token
  }

  current () {
    const token = this[this.index]
    if (!token) {
      return null
    }

    return token
  }

  previous () {
    const token = this[this.index - 1]
    if (!token) {
      return null
    }

    return token
  }

  goForward (numItems) {
    this.index += (numItems || 1)
  }

  goBackward (numItems) {
    this.index -= (numItems || 1)
  }

  lookForward (type, value, numItems) {
    const index = this.index + (numItems || 1)
    return this.expect(type, value, index)
  }

  getRawValue () {
    const token = this.next()
    return token.value
  }

  getIndention () {
    for (let index = this.index; index >= 0; index--) {
      const token = this[index]
      if (!token) {
        return 0
      }

      if (token.type === 'indention') {
        return token.value
      }
    }

    return 0
  }

  expect (type, value, index) {
    const token = this[index || this.index]
    if (!token) {
      return false
    }

    if (value && Array.isArray(value)) {
      return value.indexOf(token.value) >= 0
    } else if (value && token.value !== value) {
      return false
    }

    return Array.isArray(type)
      ? type.some((t) => t === token.type)
      : token.type === type
  }

  lastIndention (mode, indention) {
    indention = Math.max(indention, 0)

    const currentIndention = this.getIndention()
    // console.log('INDENTION CHECK', currentIndention, mode, indention)

    if (mode === 'eq') {
      return currentIndention === indention
    } else if (mode === 'lt') {
      return currentIndention < indention
    } else if (mode === 'lte') {
      return currentIndention <= indention
    } else if (mode === 'gt') {
      return currentIndention > indention
    } else if (mode === 'gte') {
      return currentIndention >= indention
    } else {
      throw new Error(`Wrong mode param! '${mode}'`)
    }
  }

  isIndention (mode, indention, curIndention) {
    indention = Math.max(indention, 0)
    const token = this.current()

    if (curIndention === undefined && token && token.type !== 'indention') {
      return false
    }

    const currentIndention = curIndention || (token === null ? 0 : token.value)
    // console.log('INDENTION CHECK', currentIndention, mode, indention)

    if (mode === 'eq') {
      return currentIndention === indention
    } else if (mode === 'lt') {
      return currentIndention < indention
    } else if (mode === 'lte') {
      return currentIndention <= indention
    } else if (mode === 'gt') {
      return currentIndention > indention
    } else if (mode === 'gte') {
      return currentIndention >= indention
    } else {
      throw new Error(`Wrong mode param! '${mode}'`)
    }
  }

  print (msg) {
    const startIndex = Math.max(this.index - 2, 0)
    const endIndex = Math.min(startIndex + 5, this.length)
    console.log('Len:', this.length)
    console.log('Start:', startIndex)
    console.log('End:', endIndex)
    console.log('Index:', this.index)
    console.log('Stack', this)
    const items = this.slice(startIndex, endIndex)
    if (msg) {
      console.log(` + ${msg}`)
    }

    console.log('Items:', items)
    items.forEach((item, index) => {
      const arrow = this.index - startIndex === index ? '>' : ' '
      console.log(`${arrow}| ${item.type} ${item.value}`)
    })
  }
}

module.exports = TokenStack
