const FireScriptNode = require('./FireScriptNode')

class Program extends FireScriptNode {
  constructor (tokenStack) {
    super()

    this.body = []

    while (true) {
      const node = this.createNode(tokenStack)
      if (!node) {
        break
      }

      this.body.push(node)
    }
  }

  toJSON () {
    return {
      type: 'Program',
      sourceType: 'module',
      body: this.body.map((item) => item.toJSON())
    }
  }
}

module.exports = Program
