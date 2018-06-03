const FireScriptNode = require('./FireScriptNode')

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
 * @extends FireScriptNode
 */
class TemplateLiteral extends FireScriptNode {
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

  toJSON () {
    return this.createJSON({
      type: 'TemplateLiteral',
      quasis: this.quasis.map((item) => item.toJSON()),
      expressions: this.expressions.map((item) => item.toJSON())
    })
  }
}

module.exports = TemplateLiteral
