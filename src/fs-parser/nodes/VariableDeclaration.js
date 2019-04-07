const Node = require('./Node')

class VariableDeclaration extends Node {
  constructor (parser, token) {
    super(parser, token)

    this.kind = token.value || parser.getIdentifireValue()
    if (!['var', 'let', 'const'].includes(this.kind)) {
      parser.syntaxError('Unexpected token, keyword var let or const expected')
    }

    this.declarations = []

    while (true) {
      const nextToken = parser.nextToken()
      this.declarations.push(parser.createNode('VariableDeclarator', nextToken))
      if (parser.expect('punctuator', ',')) {
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
