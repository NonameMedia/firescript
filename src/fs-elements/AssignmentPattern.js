const FireScriptElement = require('./FireScriptElement')

const ALLOWED_LEFT_CHILDS = [
  'Identifier',
  'ArrayPattern',
  'ObjectPattern'
]

const ALLOWED_RIGHTT_CHILDS = [
  'ThisExpression', 'Identifier', 'Literal',
  'ArrayExpression', 'ObjectExpression',
  'FunctionExpression', 'ArrowFunctionExpression',
  'ClassExpression', 'TaggedTemplateExpression',
  'MemberExpression', 'Super', 'MetaProperty',
  'NewExpression', 'CallExpression',
  'UpdateExpression', 'AwaitExpression',
  'UnaryExpression', 'BinaryExpression',
  'LogicalExpression', 'ConditionalExpression',
  'YieldExpression', 'AssignmentExpression',
  'SequenceExpression'
]

/**
 * AssignmentPattern
 *
 * @class AssignmentPattern
 * @extends FireScriptElement
 *
 * interface AssignmentPattern {
 *   type: 'AssignmentPattern';
 *   left: Identifier | BindingPattern;
 *   right: Expression;
 * }
 */
class AssignmentPattern extends FireScriptElement {
  constructor (ast) {
    super(ast)

    this.left = this.createElement(ast.left, ALLOWED_LEFT_CHILDS)
    this.right = this.createElement(ast.right, ALLOWED_RIGHTT_CHILDS)
  }

  toFSString (ctx) {
    return this.renderElement(
      this.left.toFSString(ctx) +
      ' = ' +
      this.right.toFSString(ctx)
    )
  }
}

module.exports = AssignmentPattern
