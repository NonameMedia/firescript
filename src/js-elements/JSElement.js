const NodeNotAllowedError = require('../errors/NodeNotAllowedError')
const TemplateNotFoundError = require('../errors/TemplateNotFoundError')
const templates = require('../js-templates/esx.js')

class JSElement {
  constructor (ast) {
    this.parent = null
    this.type = ast.type
    this.childs = []
    this.indention = 0
    this.__indention = 0
    this.indentionSize = 2
  }

  indentionStr () {
    return ' '.repeat(this.indention * this.indentionSize)
  }

  getIndention () {
    return ' '.repeat((this.__indention + inc) * this.indentionSize)
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
    return child
  }

  createElementList (ast, ALLOWED_NODES, indentionSize) {
    return ast.map((child) => this.createElement(child, ALLOWED_NODES, indentionSize))
  }

  renderAll (nodes, joiner) {
    return nodes.map((node) => this.renderItem(node)).join(joiner || '')
  }

  renderItem (node) {
    return `${node.getIndention()}${node}`
  }

  render (code) {
    const str = []
    if (code) {
      str.push(code)
    }
    const parent = this
    return {
      indentChilds (childs) {
        console.log('CHILDS', childs)
        childs.forEach((node) => {
          const ind = node.getIndention()
          str.push(`\n${ind}${node}`)
        })
        return this
      },
      render (code) {
        str.push(code)
        return this
      },
      indent (code) {
        const ind = parent.getIndention()
        str.push(`\n${ind}${code}`)
        return this
      },
      toString () {
        return str.join('')
      }
    }
  }
}

module.exports = JSElement
