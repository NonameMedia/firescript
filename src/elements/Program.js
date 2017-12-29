const FireScriptElement = require('./FireScriptElement')

class Program extends FireScriptElement {
  constructor (ast) {
    super(ast)

    ast.body.forEach((item) => {
      const child = this.createElement(item)
      this.appendChild(child)
    })
  }

  toString () {
    const childs = this.childs.map((item) => item.toString()).join('')
    return `${childs}\n`
  }
}

module.exports = Program
