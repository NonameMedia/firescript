const ASTCreator = require('../utils/ASTCreator')

function createExpressionChain (expressions) {
  const next = (item) => {
    const right = expressions.shift()
    if (!right) {
      return item
    }

    return next(ASTCreator.binaryExpression('+', item, right))
  }

  const firstItem = ASTCreator.binaryExpression('+',
    expressions.shift(),
    expressions.shift())
  return next(firstItem)
}
/**
 * Transforms a template literal
 *
 * interface TemplateLiteral {
 *   type: 'TemplateLiteral';
 *   quasis: TemplateElement[];
 *   expressions: Expression[];
 * }
 */
module.exports = (transformer) => {
  if (transformer.test((ctx) => ctx.esTemplates === false)) {
    transformer.add('TemplateLiteral', (ast) => {
      let expressions = []
      for (let i = 0; i < ast.quasis.length; i++) {
        const literal = ast.quasis[i].value.raw
        if (ast.quasis[i] && literal !== '') {
          expressions.push(ASTCreator.literal(`'${literal}'`))
        }

        if (ast.expressions[i]) {
          expressions.push(ast.expressions[i])
        }
      }

      return createExpressionChain(expressions)
    })
  }
}
