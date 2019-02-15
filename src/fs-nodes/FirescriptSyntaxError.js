const FirescriptNode = require('./FirescriptNode')

class FirescriptSyntaxError extends FirescriptNode {
  constructor (tokenStack, parent, error) {
    super(tokenStack, parent)

    this.error = error
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'FirescriptSyntaxError',
      error: this.error
    })
  }
}

module.exports = FirescriptSyntaxError
