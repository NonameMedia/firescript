const JSElement = require('./JSElement')

/**
 * Comment
 *
 * @class Comment
 * @extends JSElement
 *
 * interface Comment {
 *   type: 'Line|Block';
 *   value: string;
 * }
 */
class Comment extends JSElement {
  constructor (ast) {
    super(ast)

    this.value = ast.value
    this.commentType = ast.type.toLowerCase()
  }

  compile (buffer) {
    const commentStr = this.commentType === 'line' ? ['//', ''] : ['/*', '*/']
    buffer.write(commentStr[0] +
      this.value +
      commentStr[1])
  }

  toESString (ctx) {
    const commentStr = this.commentType === 'line' ? ['//', '\n'] : ['/*', '*/']
    return commentStr[0] +
      this.value +
      commentStr[1]
  }

  getLength () {
    return this.value.length + (this.commentType === 'line' ? 2 : 4)
  }
}

module.exports = Comment
