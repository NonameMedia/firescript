const Node = require('./Node')

class Super extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('identifier "super"')) {
      this.syntaxError(`Unexpectrd token, super identifier expected`)
    }

    parser.skipNext()
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'Super'
    })
  }
}

module.exports = Super
