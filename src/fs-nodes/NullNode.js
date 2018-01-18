const FireScriptNode = require('./FireScriptNode')

class NullNode extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)
    this.type = 'Null'
  }

  toJSON () {
    return null
  }
}

module.exports = NullNode
