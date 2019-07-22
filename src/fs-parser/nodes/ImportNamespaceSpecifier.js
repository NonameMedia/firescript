const Node = require('./Node')

/**
 * ImportNamespaceSpecifier
 *
 * @class ImportNamespaceSpecifier
 * @extends Node
 *
 * interface ImportDefaultSpNamespace {
 *     type: 'ImportDefaultSpecifier' | 'ImportDefaultSpecifier' | 'ImportNamespaceSpecifier';
 *     local: Identifier;
 *     imported?: Identifier;
 * }
 */
class ImportNamespaceSpecifier extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('operator "*"')) {
      parser.syntaxError('Unexpected token! ImportNamespaceSpecifier expected')
    }

    parser.skipNext()

    if (!parser.match('identifier "as"')) {
      parser.syntaxError('Unexpected token, as identifier expected!')
    }

    parser.skipNext()
    this.local = parser.createNode('Identifier')
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ImportNamespaceSpecifier',
      local: this.local.resolve(ctx)
    })
  }
}

module.exports = ImportNamespaceSpecifier
