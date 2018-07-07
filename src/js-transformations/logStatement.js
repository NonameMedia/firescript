const ASTCreator = require('../utils/ASTCreator')

module.exports = (transformer) => {
  transformer.add('FirescriptLogStatement', (ast) => {
    return ASTCreator.expressionStatement(
      ASTCreator.callExpression(
        ASTCreator.memberExpression('console', 'log'),
        ast.arguments
      )
    )
  })
}
