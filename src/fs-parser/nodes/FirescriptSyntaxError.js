const Node = require('./Node')

class FirescriptSyntaxError extends FirescriptNode {
  constructor (parser, error) {
    super(parser)

    this.error = error
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'FirescriptSyntaxError',
      error: this.error
    })
  }
}

module.exports = FirescriptSyntaxError
