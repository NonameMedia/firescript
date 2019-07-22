const Node = require('./Node')

class ForOfStatement extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('keyword', 'for')) {
      this.syntaxError('Unexpected token! For-of statement expected')
    }

    parser.skipNext()
    this.left = parser.createNode('VariableDeclaration', 'const')

    if (!parser.match('identifier "of"')) {
      this.syntaxError('Unexpected token, of identifier expected!')
    }

    parser.skipNext()
    this.right = parser.nextNode(this)
    this.body = parser.createNode('BlockStatement')
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ForOfStatement',
      left: this.left.resolve(ctx),
      right: this.right.resolve(ctx),
      body: this.body.resolve(ctx)
    })
  }
}

module.exports = ForOfStatement
