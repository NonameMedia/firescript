const Node = require('./Node')

class EmptyStatement extends Node {
  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'EmptyStatement'
    })
  }
}

module.exports = EmptyStatement
