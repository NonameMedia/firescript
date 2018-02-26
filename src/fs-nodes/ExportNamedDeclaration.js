const FireScriptNode = require('./FireScriptNode')

const ALLOWED_CHILDS = [
  'ClassDeclaration',
  'FunctionDeclaration',
  'VariableDeclaration'
]
/**
 * ExportNamedDeclaration description
 *
 * @class ExportNamedDeclaration
 * @extends FireScriptNode
 *
 * interface ExportNamedDeclaration {
 *   type: 'ExportNamedDeclaration';
 *   declaration: ClassDeclaration | FunctionDeclaration | VariableDeclaration;
 *   specifiers: ExportSpecifier[];
 *   source: Literal;
 * }
 */
class ExportNamedDeclaration extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)
    this.isBlockScope = true

    if (!tokenStack.expect('keyword', 'export')) {
      this.syntaxError(`Unexpected token, export decalration expected`)
    }

    tokenStack.goForward()

    if (tokenStack.expect('keyword', ['class', 'func', 'var', 'let', 'const'])) {
      this.declaration = this.createFullNode(tokenStack)
      this.isAllowedNode(this.declaration, ALLOWED_CHILDS)
    } else {
      // TODO destruced exports
    }

    if (tokenStack.expect('identifier', 'from')) {
      tokenStack.goForward()
      this.source = this.createLiteralNode(tokenStack)
    }
  }

  toJSON () {
    return {
      type: 'ExportNamedDeclaration',
      declaration: this.declaration.toJSON(),
      source: this.source ? this.source.toJSON() : null
    }
  }
}

module.exports = ExportNamedDeclaration
