const Node = require('./Node')

/**
 * ImportSpecifier
 *
 * @class ImportSpecifier
 * @extends Node
 *
 * interface ImportSpecifier {
 *     type: 'ImportSpecifier' | 'ImportDefaultSpecifier' | 'ImportNamespaceSpecifier';
 *     local: Identifier;
 *     imported?: Identifier;
 * }
 */
class ImportSpecifier extends Node {
  constructor (parser) {
    super(parser)

    this.imported = parser.createNode('Identifier')
    this.local = this.imported

    if (parser.match('identifier "as"')) {
      parser.nextToken()
      this.local = parser.createNode('Identifier')
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ImportSpecifier',
      local: this.local.resolve(ctx),
      imported: this.imported.resolve(ctx)
    })
  }
}

module.exports = ImportSpecifier
