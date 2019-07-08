const Node = require('./Node')

/**
 * ExportSpecifier
 *
 * @class ExportSpecifier
 * @extends Node
 *
 * interface ExportSpecifier {
 *     type: 'ExportSpecifier'
 *     local: Identifier;
 *     exporte?: Identifier;
 * }
 */
class ExportSpecifier extends Node {
  constructor (parser) {
    super(parser)

    this.exported = parser.createNode('Identifier')
    this.local = this.exported

    if (parser.match('identifier "as"')) {
      parser.skipNext()
      this.local = parser.createNode('Identifier')
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ExportSpecifier',
      local: this.local.resolve(ctx),
      exported: this.exported.resolve(ctx)
    })
  }
}

module.exports = ExportSpecifier
