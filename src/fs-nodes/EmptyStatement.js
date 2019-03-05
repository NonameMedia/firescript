const FirescriptNode = require('./FirescriptNode')

class EmptyStatement extends FirescriptNode {
  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'EmptyStatement'
    })
  }
}

module.exports = EmptyStatement
