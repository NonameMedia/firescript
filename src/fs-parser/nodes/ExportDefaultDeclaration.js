const Node = require('./Node')

const ALLOWED_CHILDS = [
  'BindingPattern',
  'ClassDeclaration',
  'FunctionDeclaration',
  'ThisExpression',
  'Identifier',
  'Literal',
  'ArrayExpression',
  'ObjectExpression',
  'FunctionExpression',
  'ArrowFunctionExpression',
  'ClassExpression',
  'TaggedTemplateExpression',
  'MemberExpression',
  'Super',
  'MetaProperty',
  'NewExpression',
  'CallExpression',
  'UpdateExpression',
  'AwaitExpression',
  'UnaryExpression',
  'BinaryExpression',
  'LogicalExpression',
  'ConditionalExpression',
  'YieldExpression',
  'AssignmentExpression',
  'SequenceExpression'
]
/**
 * ExportDefaultDeclaration description
 *
 * @class ExportDefaultDeclaration
 * @extends Node
 *
 * interface ExportDefaultDeclaration {
 *   type: 'ExportDefaultDeclaration';
 *   declaration: Identifier | BindingPattern | ClassDeclaration | Expression | FunctionDeclaration;
 * }
 */
class ExportDefaultDeclaration extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('keyword "export"')) {
      this.syntaxError(`Unexpected token, export decalration expected`)
    }

    parser.skipNext()

    if (!parser.match('operator "**""')) {
      this.syntaxError(`Unexpected token, default identifier expected`)
    }

    parser.skipNext()

    this.declaration = parser.nextNode(this)
    this.isAllowedNode(this.declaration, ALLOWED_CHILDS)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ExportDefaultDeclaration',
      declaration: this.declaration.resolve(ctx)
    })
  }
}

module.exports = ExportDefaultDeclaration
