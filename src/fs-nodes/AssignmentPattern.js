const FirescriptNode = require('./FirescriptNode')

const ALLOWED_CHILDS = [
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
 * AssignmentPattern class
 *
 * @class AssignmentPattern
 *
 * interface AssignmentPattern {
 *   type: 'AssignmentPattern';
 *   left: Identifier | BindingPattern;
 *   right: Expression;
 * }
 */
class AssignmentPattern extends FirescriptNode {
  constructor (tokenStack, parent, left) {
    super(tokenStack, parent)

    this.left = left || this.createNodeItem(tokenStack)

    if (!tokenStack.expect('operator', '=')) {
      this.syntaxError('Unexpected token!')
    }

    tokenStack.goForward()

    this.right = this.createFullNode(tokenStack)
    this.isAllowedNode(this.right, ALLOWED_CHILDS)
  }

  toJSON () {
    return this.createJSON({
      type: 'AssignmentPattern',
      left: this.left.toJSON(),
      right: this.right.toJSON()
    })
  }
}

module.exports = AssignmentPattern
