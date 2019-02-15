const FirescriptNode = require('./FirescriptNode')

const ALLOWED_DECLARATIONS = [
  'ClassDeclaration',
  'FunctionDeclaration',
  'VariableDeclaration'
]

const ALLOWED_SPECIFIERS = [
  ''
]
/**
 * ExportNamedDeclaration description
 *
 * @class ExportNamedDeclaration
 * @extends FirescriptNode
 *
 * interface ExportNamedDeclaration {
 *   type: 'ExportNamedDeclaration';
 *   declaration: ClassDeclaration | FunctionDeclaration | VariableDeclaration;
 *   specifiers: ExportSpecifier[];
 *   source: Literal;
 * }
 */
class ExportNamedDeclaration extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)
    this.isBlockScope = true
    const indention = tokenStack.getIndention()

    if (!tokenStack.expect('keyword', 'export')) {
      this.syntaxError(`Unexpected token, export decalration expected`)
    }

    tokenStack.goForward()
    this.specifiers = []

    if (tokenStack.expect('keyword', ['class', 'async', 'func', 'var', 'let', 'const'])) {
      this.declaration = this.createFullNode(tokenStack)
      this.isAllowedNode(this.declaration, ALLOWED_DECLARATIONS)
    } else {
      while (true) {
        if (tokenStack.isIndention('gte', indention)) {
          tokenStack.goForward()
          break
        }

        const node = this.createExportSpecifierNode(tokenStack)
        this.specifiers.push(node)

        if (tokenStack.expect('punctuator', ',')) {
          tokenStack.goForward()
          continue
        }

        if (tokenStack.isIndention('gt', indention)) {
          tokenStack.goForward()
          continue
        }

        break
      }
    }

    if (tokenStack.expect('identifier', 'from')) {
      tokenStack.goForward()
      this.source = this.createLiteralNode(tokenStack)
    }
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'ExportNamedDeclaration',
      declaration: this.declaration ? this.declaration.toJSON(ctx) : null,
      specifiers: this.specifiers.map((item) => item.toJSON(ctx)),
      source: this.source ? this.source.toJSON(ctx) : null
    })
  }
}

module.exports = ExportNamedDeclaration
