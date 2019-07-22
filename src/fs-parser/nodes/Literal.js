const Node = require('./Node')

class Literal extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('literal') && !parser.match('numeric')) {
      parser.syntaxError('Unexpected token, literal expected')
    }

    const token = parser.nextToken()
    this.raw = token.value

    if (token.type === 'numeric') {
      if (/^\d+(e\d+)?$/.test(token.value)) {
        this.value = parseInt(token.value, 10)
      } else if (/^\d+\.\d+(e\d+)?$/.test(token.value)) {
        this.value = parseFloat(token.value, 10)
      } else if (/^0[bB][01]+?|0[oO]\d+|0[xX][a-fA-F0-9]+$/.test(token.value)) {
        this.value = Number(token.value)
      }
    } else {
      if (/^["'`]/.test(token.value)) {
        this.value = token.value.slice(1, -1)
      } else if (token.value === 'true') {
        this.value = true
      } else if (token.value === 'false') {
        this.value = false
      } else if (token.value === 'null') {
        this.value = null
      } else if (/^\//.test(token.value)) {
        this.value = token.value
        const splitIndex = token.value.lastIndexOf('/')
        this.regex = {
          pattern: token.value.slice(1, splitIndex),
          flags: token.value.slice(splitIndex + 1)
        }
      } else {
        this.value = token.value
      }
    }
  }

  resolve (ctx) {
    const data = {
      type: 'Literal',
      raw: this.raw,
      value: this.value
    }

    if (this.regex) {
      data.regex = this.regex
    }

    return this.createJSON(ctx, data)
  }
}

module.exports = Literal