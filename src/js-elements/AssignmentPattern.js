const JSElement = require('./JSElement')

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
 * @extends JSElement
 *
 * interface AssignmentPattern {
 *   type: 'AssignmentPattern';
 *   left: Identifier | BindingPattern;
 *   right: Expression;
 * }
 */
class AssignmentPattern extends JSElement {
  constructor (ast) {
    super(ast)

    this.left = this.createElement(ast.left, ALLOWED_LEFT_CHILDS)
    this.right = this.createElement(ast.right, ALLOWED_RIGHTT_CHILDS)
  }

  toESString (ctx) {
    return this.left.toESString(ctx) +
      ' = ' +
      this.right.toESString(ctx)
  }
}

module.exports = AssignmentPattern
