const Node = require('./Node')

class ForStatement extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('keyword "for"')) {
      this.syntaxError('Unexpected token, for statement expected!')
    }

    parser.skipNext()

    if (parser.match('identifier > operator "="')) {
      this.init = parser.createNode('VariableDeclaration', 'let')
    } else {
      this.init = parser.nextNode(this)
    }

    if (!parser.match('punctuator', ';')) {
      this.syntaxError('Unexpected token!')
    }

    parser.skipNext()
    this.test = parser.nextNode(this)

    if (!parser.match('punctuator', ';')) {
      this.syntaxError('Unexpected token!')
    }

    parser.skipNext()
    this.update = parser.nextNode(this)

    this.body = parser.createNode('BlockStatement')
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ForStatement',
      init: this.init.resolve(ctx),
      test: this.test.resolve(ctx),
      update: this.update.resolve(ctx),
      body: this.body.resolve(ctx)
    })
  }
}

module.exports = ForStatement
