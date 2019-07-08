const Node = require('./Node')

class ImportDeclaration extends Node {
  constructor (parser) {
    super(parser)

    let token = parser.nextToken()
    if (!token.type === 'import') {
      this.syntaxError(`${token.value} is not a import declaration`)
    }

    this.specifiers = []

    while (true) {
      if (parser.match('identifier "from"')) {
        parser.skipNext()
        break
      } else if (parser.match('literal') && this.specifiers.length === 0) {
        break
      } else if (parser.match('indention')) {
        parser.skipNext()

        while (true) {
          if (parser.match('identifier "from"')) {
            break
          } else if (parser.match('indention')) {
            parser.skipNext()
            continue
          }

          this.specifiers.push(parser.createNode('ImportSpecifier'))
        }
      } else if (parser.match('punctuator "{"')) {
        parser.skipNext()

        while (true) {
          if (parser.match('punctuator "}"')) {
            parser.skipNext()
            break
          } else if (parser.match('punctuator', ',')) {
            parser.skipNext()
            continue
          }

          this.specifiers.push(parser.createNode('ImportSpecifier'))
        }
      } else if (parser.match('operator', '*')) {
        this.specifiers.push(parser.createNode('ImportNamespaceSpecifier'))
      } else if (parser.match('operator', '**')) {
        this.specifiers.push(parser.createNode('ImportDefaultSpecifier'))
      } else if (parser.match('punctuator', ',')) {
        parser.skipNext()
        continue
      } else if (parser.match('identifier')) {
        this.specifiers.push(parser.createNode('ImportSpecifier'))
      } else {
        this.syntaxError('Unexpected token')
        break
      }
    }

    this.source = parser.nextNode(this)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ImportDeclaration',
      source: this.source.resolve(ctx),
      specifiers: this.specifiers.map((item) => item.resolve(ctx))
    })
  }
}

module.exports = ImportDeclaration
