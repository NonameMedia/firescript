const Node = require('./Node')

/**
 * ExportAllDeclaration description
 *
 * @class ExportAllDeclaration
 * @extends Node
 *
 * interface ExportAllDeclaration {
 *   type: 'ExportAllDeclaration';
 *   declaration: Identifier | BindingPattern | ClassDeclaration | Expression | FunctionDeclaration;
 * }
 */
class ExportAllDeclaration extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('keyword "export"')) {
      this.syntaxError(`Unexpected token, export decalration expected`)
    }

    parser.skipNext()

    if (!parser.match('operator "*"')) {
      this.syntaxError(`Unexpected token, * char expected`)
    }

    parser.skipNext()

    if (!parser.match('identifier "from"')) {
      this.syntaxError(`Unexpected token, from Identifier expected`)
    }

    parser.skipNext()

    this.source = parser.createNode('Literal')
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ExportAllDeclaration',
      source: this.source.resolve(ctx)
    })
  }
}

module.exports = ExportAllDeclaration
