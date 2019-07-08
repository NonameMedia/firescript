const Node = require('./Node')

class IfStatement extends Node {
  constructor (parser) {
    super(parser)

    if (parser.match('keyword "if"')) {
      parser.skipNext()
      this.test = parser.nextNode(this)
    } else if (parser.match('keyword "elif"')) {
      // this.expectParent('IfStatement')

      parser.skipNext()
      this.test = parser.nextNode(this)
    } else {
      this.syntaxError('Unexpected token! If statement expected')
    }

    if (!parser.isInnerScope(this.indention)) {
      this.syntaxError('Unexpected token! Indention expected!')
    }

    this.consequent = parser.createNode('BlockStatement')

    if (parser.match('indention > keyword "elif"')) {
      parser.skipNext()
      this.alternate = parser.createNode('IfStatement')
    }

    if (parser.match('indention > keyword "else"')) {
      parser.skipNext()
      parser.skipNext()
      this.alternate = parser.createNode('BlockStatement')
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'IfStatement',
      test: this.test.resolve(ctx),
      consequent: this.consequent.resolve(ctx),
      alternate: this.alternate ? this.alternate.resolve(ctx) : null
    })
  }
}

module.exports = IfStatement
