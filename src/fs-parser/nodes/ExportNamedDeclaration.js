const Node = require('./Node')

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
 * @extends Node
 *
 * interface ExportNamedDeclaration {
 *   type: 'ExportNamedDeclaration';
 *   declaration: ClassDeclaration | FunctionDeclaration | VariableDeclaration;
 *   specifiers: ExportSpecifier[];
 *   source: Literal;
 * }
 */
class ExportNamedDeclaration extends Node {
  constructor (parser) {
    super(parser)
    this.isBlockScope = true

    if (!parser.match('keyword "export"')) {
      this.syntaxError(`Unexpected token, export decalration expected`)
    }

    parser.skipNext()
    this.specifiers = []

    if (parser.match('keyword [class,async,func,var,let,const]')) {
      this.declaration = parser.nextNode(this)
      this.isAllowedNode(this.declaration, ALLOWED_DECLARATIONS)
    } else {
      for (const scope of parser.walkScope()) {
        if (parser.match('punctuator ","')) {
          parser.skipNext()
        }

        const node = scope.createNode('ExportSpecifier')
        this.specifiers.push(node)
      }
    }

    if (parser.match('identifier', 'from')) {
      parser.skipNext()
      this.source = parser.createNode('Literal')
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ExportNamedDeclaration',
      declaration: this.declaration ? this.declaration.resolve(ctx) : null,
      specifiers: this.specifiers.map((item) => item.resolve(ctx)),
      source: this.source ? this.source.resolve(ctx) : null
    })
  }
}

module.exports = ExportNamedDeclaration
