class TokenStack extends Array {
  constructor (items) {
    super()

    if (items) {
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

  expect (type, value, index) {
    const token = this[index || this.index]
    if (!token) {
      return false
    }

    if (value && token.value !== value) {
      return false
    }

    return token.type === type
  }

  isIndention (indention, mode) {
    mode = mode || 'eq'
    const token = this.current()
    if (token.type !== 'indention') {
      return false
    }

    if (mode === 'eq') {
      return token.value === indention
    } else if (mode === 'lt') {
      return token.value < indention
    } else if (mode === 'lte') {
      return token.value <= indention
    } else if (mode === 'gt') {
      return token.value > indention
    } else if (mode === 'gte') {
      return token.value >= indention
    } else {
      throw new Error(`Wrong mode param! '${mode}'`)
    }
  }

  print (msg) {
    const startIndex = Math.max(this.index - 2, 0)
    const endIndex = Math.min(startIndex + 5, this.length)
    const items = this.slice(startIndex, endIndex)
    if (msg) {
      console.log(` + ${msg}`)
    }
    items.forEach((item, index) => {
      const arrow = this.index - startIndex === index ? '>' : ' '
      console.log(`${arrow}| ${item.type} ${item.value}`)
    })
  }
}

module.exports = TokenStack
