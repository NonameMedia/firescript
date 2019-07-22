const Node = require('./Node')

/**
 * ImportDefaultSpecifier
 *
 * @class ImportDefaultSpecifier
 * @extends Node
 *
 * interface ImportDefaultSpecifier {
 *     type: 'ImportDefaultSpecifier' | 'ImportDefaultSpecifier' | 'ImportNamespaceSpecifier';
 *     local: Identifier;
 *     imported?: Identifier;
 * }
 */
class ImportDefaultSpecifier extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('operator "**"')) {
      this.syntaxError('Unexpected token! ** operator expected')
    }

    parser.skipNext()

    if (!parser.match('identifier "as"')) {
      this.syntaxError('Unexpected token, as identifier expected!')
    }

    parser.skipNext()

    this.local = parser.createNode('Identifier')
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ImportDefaultSpecifier',
      local: this.local.resolve(ctx)
    })
  }
}

module.exports = ImportDefaultSpecifier
