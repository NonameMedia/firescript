const Node = require('./Node')

class WhileStatement extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('keyword "while"')) {
      this.syntaxError('Unexpected token, while statement expected')
    }

    parser.skipNext()
    this.test = parser.nextNode(this)
    this.body = parser.createNode('BlockStatement')
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'WhileStatement',
      test: this.test.resolve(ctx),
      body: this.body.resolve(ctx)
    })
  }
}

module.exports = WhileStatement
