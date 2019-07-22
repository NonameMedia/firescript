const Node = require('./Node')

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
class TemplateLiteral extends Node {
  constructor (parser) {
    super(parser)

    if (!parser.match('template')) {
      this.syntaxError('Unexpected token! Tempalte literal expected')
    }

    this.quasis = []
    this.expressions = []

    while (true) {
      const quasi = parser.createNode('TemplateElement')
      this.quasis.push(quasi)
      if (quasi.tail) {
        break
      }

      const expression = parser.nextNode(this)
      this.isAllowedNode(expression, ALLOWED_EXPRESSIONS)
      this.expressions.push(expression)
    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'TemplateLiteral',
      quasis: this.quasis.map((item) => item.resolve(ctx)),
      expressions: this.expressions.map((item) => item.resolve(ctx))
    })
  }
}

module.exports = TemplateLiteral
