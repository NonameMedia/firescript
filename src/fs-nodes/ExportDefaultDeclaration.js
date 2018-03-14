const FireScriptNode = require('./FireScriptNode')

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
 * @extends FireScriptNode
 *
 * interface ExportDefaultDeclaration {
 *   type: 'ExportDefaultDeclaration';
 *   declaration: Identifier | BindingPattern | ClassDeclaration | Expression | FunctionDeclaration;
 * }
 */
class ExportDefaultDeclaration extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    if (!tokenStack.expect('keyword', 'export')) {
      this.syntaxError(`Unexpected token, export decalration expected`)
    }

    tokenStack.goForward()

    if (!tokenStack.expect('identifier', 'default')) {
      this.syntaxError(`Unexpected token, default identifier expected`)
    }

    tokenStack.goForward()

    this.declaration = this.createFullNode(tokenStack)
    this.isAllowedNode(this.declaration, ALLOWED_CHILDS)
  }

  toJSON () {
    return {
      type: 'ExportDefaultDeclaration',
      declaration: this.declaration.toJSON()
    }
  }
}

module.exports = ExportDefaultDeclaration
