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
    return this.childs.map((item) => item.toString()).join('')
  }
}

module.exports = Program
