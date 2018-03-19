class JSElement {
  constructor (ast) {
    this.parent = null
    this.type = ast.type
    this.childs = []
    this.indention = 0
  }

  indent (size) {
    this.indention += size
  }

  indentionStr () {
    return '  '.repeat(this.indention)
  }

  createElement (ast) {
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

    child.parent = this
    child.indention = this.indention
    return child
  }

  createElementList (ast) {
    return ast.map((child) => this.createElement(child))
  }
}

module.exports = JSElement
