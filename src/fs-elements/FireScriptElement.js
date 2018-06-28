const NodeNotAllowedError = require('../errors/NodeNotAllowedError')
const TemplateNotFoundError = require('../errors/TemplateNotFoundError')
const templates = require('../js-templates/esx.js')

class FirescriptElement {
  constructor (ast) {
    this.parent = null
    this.type = ast.type
    this.childs = []
    this.indention = 0
    this.__indention = 0
    this.indentionSize = 2
  }

  toFSString () {
    throw new Error(`Firescript element ${this.type} not implemented yet!`)
  }

  indentionStr () {
    return ' '.repeat(this.indention * this.indentionSize)
  }

  getIndention (size) {
    return ' '.repeat((size || this.__indention) * this.indentionSize)
  }

  getTemplate () {
    if (!(this.type in templates)) {
      throw new TemplateNotFoundError(this.type)
    }
    return templates[this.type]
  }

  createElement (ast, ALLOWED_NODES, indentionSize) {
    if (!ast.type) {
      return null
    }

    let Element
    try {
      Element = require(`./${ast.type}`)
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        throw new Error(`Element ${ast.type} not implemented yet`)
      }

      throw err
    }

    const child = new Element(ast)

    if (ALLOWED_NODES && !ALLOWED_NODES.includes(child.type)) {
      throw new NodeNotAllowedError(child.type, this.type, ALLOWED_NODES)
    }

    child.parent = this
    child.indention = indentionSize ? this.indention + indentionSize : this.indention
    if (ast.leadingComments) {
      child.leadingComments = ast.leadingComments
    }

    if (ast.trailingComments) {
      child.trailingComments = ast.trailingComments
    }

    return child
  }

  createElementList (ast, ALLOWED_NODES, indentionSize) {
    return ast.map((child) => this.createElement(child, ALLOWED_NODES, indentionSize))
  }

  getLength () {
    throw new Error(`getLength method not implemented for element ${this.type}`)
  }

  renderComments (comments, isTrailing) {
    if (!comments) return ''

    const trailingLine = !isTrailing ? '\n' : ''
    const leadingLine = isTrailing ? '' : ''

    return comments.map((comment, index, arr) => {
      if (comment.type === 'Line') {
        return '#' + comment.value
      }

      const blockCommentSpacing =
        arr[index + 1] && arr[index + 1].type === 'Block'
          ? '\n'
          : ''

      return leadingLine +
        '/*' +
        comment.value +
        '*/' +
        blockCommentSpacing
    }).join('\n') + trailingLine
  }

  renderElement (str) {
    return (this.leadingComments ? this.renderComments(this.leadingComments, false) : '') +
    str +
    (this.trailingComments ? '\n' + this.renderComments(this.trailingComments, true) : '')
  }

  isParent (types) {
    if (!this.parent) {
      return false
    }

    return typeof types === 'string' ? this.parent.type === types : types.includes(this.parent.type)
  }
}

module.exports = FirescriptElement
