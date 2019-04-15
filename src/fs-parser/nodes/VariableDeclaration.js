const Node = require('./Node')

class VariableDeclaration extends Node {
  constructor (parser) {
    super(parser)

    const token = parser.nextToken()
    this.kind = token.value

    if (!['var', 'let', 'const'].includes(this.kind)) {
      parser.syntaxError('Unexpected token, keyword var let or const expected')
    }

    this.declarations = []

    while (true) {
      this.declarations.push(parser.createNode('VariableDeclarator'))
      if (parser.match('punctuator ","')) {
        parser.nextToken()
        continue
      }

      break
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'VariableDeclaration',
      kind: this.kind,
      declarations: this.declarations.map((item) => item.resolve(ctx))
    })
  }
}

module.exports = VariableDeclaration
