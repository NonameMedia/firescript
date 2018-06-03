const FireScriptNode = require('./FireScriptNode')

/**
 * ExportAllDeclaration description
 *
 * @class ExportAllDeclaration
 * @extends FireScriptNode
 *
 * interface ExportAllDeclaration {
 *   type: 'ExportAllDeclaration';
 *   declaration: Identifier | BindingPattern | ClassDeclaration | Expression | FunctionDeclaration;
 * }
 */
class ExportAllDeclaration extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('keyword', 'export')) {
      this.syntaxError(`Unexpected token, export decalration expected`)
    }

    tokenStack.goForward()

    if (!tokenStack.expect('operator', '*')) {
      this.syntaxError(`Unexpected token, * char expected`)
    }

    tokenStack.goForward()

    if (!tokenStack.expect('identifier', 'from')) {
      this.syntaxError(`Unexpected token, from Identifier expected`)
    }

    tokenStack.goForward()

    this.source = this.createLiteralNode(tokenStack)
  }

  toJSON () {
    return this.createJSON({
      type: 'ExportAllDeclaration',
      source: this.source.toJSON()
    })
  }
}

module.exports = ExportAllDeclaration
