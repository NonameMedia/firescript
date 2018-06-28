const FirescriptNode = require('./FirescriptNode')

/**
 * ImportDefaultSpecifier
 *
 * @class ImportDefaultSpecifier
 * @extends FirescriptNode
 *
 * interface ImportDefaultSpecifier {
 *     type: 'ImportDefaultSpecifier' | 'ImportDefaultSpecifier' | 'ImportNamespaceSpecifier';
 *     local: Identifier;
 *     imported?: Identifier;
 * }
 */
class ImportDefaultSpecifier extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('operator', '**')) {
      this.syntaxError('Unexpected token! ** operator expected')
    }

    tokenStack.goForward(2)

    this.local = this.createIdentifierNode(tokenStack)
  }

  toJSON () {
    return this.createJSON({
      type: 'ImportDefaultSpecifier',
      local: this.local.toJSON()
    })
  }
}

module.exports = ImportDefaultSpecifier
