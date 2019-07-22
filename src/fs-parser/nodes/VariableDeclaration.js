const Node = require('./Node')

class VariableDeclaration extends Node {
  constructor (parser, kind) {
    super(parser)

    if (kind) {
      this.kind = kind
    } else {
      const token = parser.getKeyword()
      this.kind = token.value
    }

    if (!['var', 'let', 'const'].includes(this.kind)) {
      parser.syntaxError('Unexpected token, keyword var let or const expected')
    }

    this.declarations = []

    if (parser.match('identifier > identifier [in,of]')) {
      this.declarations.push(parser.createNode('VariableDeclarator'))
      return
    }

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
