const FirescriptNode = require('./FirescriptNode')

class Comment extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect(['comment', 'block-comment'])) {
      this.syntaxError('Unexpected token! Comment expected')
    }

    const token = tokenStack.next()
    this.commentType = token.type === 'comment' ? 'line' : 'block'
    this.value = token.value
  }

  toJSON (ctx) {
    return {
      type: this.commentType === 'line' ? 'Line' : 'Block',
      value: this.value
    }
  }
}

module.exports = Comment
