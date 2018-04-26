const ASTCreator = require('../utils/ASTCreator')

function findConstructor (classBody) {
  for (const item of classBody.body) {
    if (item.kind === 'constructor') {
      return {
        body: item.value.body,
        params: item.value.params
      }
    }
  }
}

function handleClassMethod (className, methodDefinition) {
  const memberExpression = ASTCreator.memberExpression(
    className,
    ASTCreator.identifier('prototype')
  )

  const left = ASTCreator.memberExpression(
    memberExpression,
    methodDefinition.key
  )

  const right = methodDefinition.value
  right.id = methodDefinition.key

  const expression = ASTCreator.assignmentExpression('=', left, right)
  return ASTCreator.expressionStatement(
    expression
  )
}

function handleClassDeclaration (ast) {
  const id = ast.id
  const fn = findConstructor(ast.body)

  const childs = []

  childs.push(ASTCreator.functionDeclaration(
    id,
    fn.params,
    fn.body
  ))

  for (const method of ast.body.body) {
    if (method.kind === 'method') {
      childs.push(handleClassMethod(id, method))
    }
  }

  return childs
}

module.exports = (transformer) => {
  if (transformer.test((ctx) => ctx.esClasses === false)) {
    transformer.add('ClassDeclaration', (ast) => {
      return handleClassDeclaration(ast)
    })
  }
}
