const FirescriptNode = require('./FirescriptNode')

const ALLOWED_EXPRESSIONS = [
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
 * Tagged Template Expression
 *
 * interface TemplateLiteral {
 *   type: 'TemplateLiteral';
 *   quasis: TemplateElement[];
 *   expressions: Expression[];
 * }
 *
 * @class TemplateLiteral
 * @extends FirescriptNode
 */
class TemplateLiteral extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('template')) {
      this.syntaxError('Unexpected token! Tempalte literal expected')
    }

    this.quasis = []
    this.expressions = []

    while (true) {
      const quasi = this.createTemplateElementNode(tokenStack)
      this.quasis.push(quasi)
      if (quasi.tail) {
        break
      }

      const expression = this.createFullNode(tokenStack)
      this.isAllowedNode(expression, ALLOWED_EXPRESSIONS)
      this.expressions.push(expression)
    }
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'TemplateLiteral',
      quasis: this.quasis.map((item) => item.toJSON(ctx)),
      expressions: this.expressions.map((item) => item.toJSON(ctx))
    })
  }
}

module.exports = TemplateLiteral
