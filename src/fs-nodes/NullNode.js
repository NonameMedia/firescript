const FirescriptNode = require('./FirescriptNode')

class NullNode extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)
    this.type = 'Null'
  }

  toJSON (ctx) {
    return null
  }
}

module.exports = NullNode
