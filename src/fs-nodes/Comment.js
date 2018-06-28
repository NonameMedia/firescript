const FirescriptNode = require('./FirescriptNode')

class Comment extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect(['comment', 'block-comment'])) {
      this.syntaxError('Unexpected token! Comment expected')
    }

    const token = tokenStack.next()
    this.commentType = token.type === 'comment' ? 'Line' : 'Block'
    this.value = token.value
  }

  toJSON () {
    return {
      type: this.commentType,
      value: this.value
    }
  }
}

module.exports = Comment
