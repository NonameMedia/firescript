const ASTCreator = require('../utils/ASTCreator')

function getExportsExpression () {
  const object = ASTCreator.identifier('module')
  const property = ASTCreator.identifier('exports')
  return ASTCreator.memberExpression(object, property)
}

function handleVariableDeclaration (ast) {
  const childs = []

  childs.push(ast)
  ast.declarations.forEach((item) => {
    const property = item.id
    const memberExpression = ASTCreator.memberExpression(getExportsExpression(), property)

    childs.push(ASTCreator.expressionStatement(
      ASTCreator.assignmentExpression('=',
        memberExpression,
        property
      )
    ))
  })

  return childs
}

function handleFunctionOrClassExpression (ast) {
  const property = ast.id
  const memberExpression = ASTCreator.memberExpression(getExportsExpression(), property)

  return ASTCreator.expressionStatement(
    ASTCreator.assignmentExpression('=',
      memberExpression,
      ast
    )
  )
}

module.exports = (transformer) => {
  if (transformer.test((ctx) => ctx.esModules === false)) {
    transformer.add('ExportAllDeclaration', (ast) => {
      const expression = ASTCreator.expressionStatement(
        ASTCreator.assignmentExpression('=',
          getExportsExpression(),
          ASTCreator.callExpression(
            ASTCreator.identifier('require'),
            [ast.source]
          )
        )
      )
      return expression
    })
  }
}
