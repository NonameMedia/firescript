const Node = require('./Node')

const LOGICAL_OPERATORS = ['||', '&&']
/**
 * LogicalExpression
 *
 * @class LogicalExpression
 * @extends Node
 *
 * interface LogicalExpression {
 *   type: 'LogicalExpression';
 *   operator: '||' | '&&';
 *   left: Expression;
 *   right: Expression;
 * }
 */
class LogicalExpression extends Node {
  constructor (parser, left, right, operator) {
    super(parser)

    if (left && right) {
      this.left = left
      this.right = right
      this.operator = operator
      return
    }

    left = left || parser.nextNode(this)

    const expressionStack = []

    if (!parser.match('operator', LOGICAL_OPERATORS)) {
      this.syntaxError('Token is not a logical operator')
    }

    expressionStack.push([null, left])

    while (true) {
      if (parser.isOuterScope(this.indention)) {
        break
      }

      if (!parser.match('operator', LOGICAL_OPERATORS)) {
        break
      }

      const token = parser.nextToken()
      const operator = token.value
      const right = parser.nextNode(this)
      expressionStack.push([operator, right])
    }

    if (expressionStack.length === 2) {
      this.left = expressionStack[0][1]
      this.operator = expressionStack[1][0]
      this.right = expressionStack[1][1]
    } else {
      let leftExpression = expressionStack.shift()
      let rightExpression

      while (expressionStack.length > 1) {
        rightExpression = expressionStack.shift()
        leftExpression = new LogicalExpression(parser, leftExpression[1], rightExpression[1], rightExpression[0])
      }

      rightExpression = expressionStack.shift()
      this.left = leftExpression
      this.operator = rightExpression[0]
      this.right = rightExpression[1]

    }
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'LogicalExpression',
      operator: this.operator,
      left: this.left.resolve(ctx),
      right: this.right.resolve(ctx)
    })
  }
}

module.exports = LogicalExpression
