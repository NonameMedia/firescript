const Node = require('./Node')

class NullNode extends FirescriptNode {
  constructor (parser) {
    super(parser)
    this.type = 'Null'
  }

  resolve (ctx) {
    return null
  }
}

module.exports = NullNode
