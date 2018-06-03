const FireScriptNode = require('./FireScriptNode')

class NullNode extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)
    this.type = 'Null'
  }

  toJSON () {
    return null
  }
}

module.exports = NullNode
