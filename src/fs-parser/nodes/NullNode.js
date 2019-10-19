const Node = require('./Node')

class NullNode extends Node {
  constructor (parser) {
    super(parser)
    this.type = 'Null'
  }

  resolve (ctx) {
    return null
  }
}

module.exports = NullNode
