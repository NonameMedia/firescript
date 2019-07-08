const Node = require('./Node')

class SwitchStatement extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('keyword "switch"')) {
      this.syntaxError('Unexpected token, switch keyword expected')
    }

    parser.skipNext()
    this.discriminant = parser.nextNode(this)

    if (!parser.match('indention')) {
      this.syntaxError('Unexpected token')
    }

    parser.skipNext()

    this.cases = []
    let hasDefault = false

    for (const scope of parser.walkScope()) {
      if (scope.match('keyword "case"') && hasDefault) {
        this.syntaxError('Case clause not allowed after a default clause')
      } else if (scope.match('keyword "default"')) {
        hasDefault = true
      }

      this.cases.push(parser.createNode('SwitchCase'))
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'SwitchStatement',
      discriminant: this.discriminant.resolve(ctx),
      cases: this.cases.map((item) => item.resolve(ctx))
    })
  }
}

module.exports = SwitchStatement
