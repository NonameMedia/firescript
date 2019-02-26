const FirescriptElement = require('./FirescriptElement')

/**
 * Comment
 *
 * @class Comment
 * @extends FirescriptElement
 *
 * interface Comment {
 *   type: 'Line|Block';
 *   value: string;
 * }
 */
class Comment extends FirescriptElement {
  constructor (ast) {
    super(ast)

    this.commentType = ast.type.toLowerCase()
    this.value = ast.value
  }

  toFSString (ctx) {
    const commentStr = this.commentType === 'line' ? ['//', ''] : ['/*', '*/']
    return commentStr[0] +
      this.value +
      commentStr[1]
  }

  getLineLength () {
    return this.value.length + (this.commentType === 'line' ? 2 : 4)
  }
}

module.exports = Comment
