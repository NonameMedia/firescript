const Node = require('./Node')

class ClassBody extends Node {
  constructor (parser) {
    super(parser)

    this.body = []

    if (!parser.match('indention')) {
      this.syntaxError('Unexpected token')
    }

    // const token = parser.nextToken()
    // this.indention = token.value

    for (const scope of parser.walkScope()) {
      const node = scope.nextNode(this)
      if (!node) {
        break
      }

      this.isAllowedNode(node, [
        'Comment',
        'MethodDefinition'
      ])

      this.body.push(node)
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ClassBody',
      body: this.body.map((item) => item.resolve(ctx))
    })
  }
}

module.exports = ClassBody
