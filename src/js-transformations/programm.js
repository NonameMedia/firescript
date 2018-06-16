const ASTCreator = require('../utils/ASTCreator')

function getEsModuleFlag () {
  const object = ASTCreator.identifier('module')
  const property = ASTCreator.identifier('exports')
  return ASTCreator.expressionStatement(
    ASTCreator.assignmentExpression('=',
      ASTCreator.memberExpression(
        ASTCreator.memberExpression(object, property),
        ASTCreator.identifier('__esModule')),
      ASTCreator.literal(true)
    )
  )
}

module.exports = (transformer) => {
  if (transformer.test((ctx) => ctx.esModules === false)) {
    transformer.add('Program', (ast) => {
      if (ast.sourceType === 'module') {
        ast.body.push(getEsModuleFlag())
      }

      return ast
    })
  }
}
