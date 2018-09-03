const FirescriptNode = require('./FirescriptNode')

class FirescriptSyntaxError extends FirescriptNode {
  constructor (tokenStack, parent, error) {
    super(tokenStack, parent)

    this.error = error
  }

  toJSON () {
    return this.createJSON({
      type: 'FirescriptSyntaxError',
      error: this.error
    })
  }
}

module.exports = FirescriptSyntaxError
