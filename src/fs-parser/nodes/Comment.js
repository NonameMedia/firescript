const Node = require('./Node')

class Comment extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('comment')) {
      this.syntaxError('Unexpected token! Comment expected')
    }

    const token = parser.nextToken()
    this.commentType = token.value.charAt(0) === '#' ? 'line' : 'block'
    this.value = token.value
  }

  resolve (ctx) {
    return {
      type: this.commentType === 'line' ? 'Line' : 'Block',
      value: this.value
    }
  }
}

module.exports = Comment
