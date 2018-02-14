const FireScriptNode = require('./FireScriptNode')

class Program extends FireScriptNode {
  constructor (tokenStack) {
    super()

    this.isBlockScope = true
    this.body = []

    while (true) {
      const node = this.createFullNode(tokenStack)
      if (!node || node.type === 'Null') {
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
