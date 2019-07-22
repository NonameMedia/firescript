const Node = require('./Node')

class ForInStatement extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('keyword "for"')) {
      this.syntaxError('Unexpected token! for statement expected')
    }

    parser.skipNext()
    this.left = parser.createNode('VariableDeclaration', 'const')

    if (!parser.match('identifier "in"')) {
      this.syntaxError('Unexpected token, in identifier expected!')
    }

    parser.skipNext()
    this.right = parser.nextNode(this)
    this.body = parser.createNode('BlockStatement')
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ForInStatement',
      left: this.left.resolve(ctx),
      right: this.right.resolve(ctx),
      body: this.body.resolve(ctx)
    })
  }
}

module.exports = ForInStatement
