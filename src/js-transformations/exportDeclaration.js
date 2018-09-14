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
    transformer.add('ExportDefaultDeclaration', (ast) => {
      const property = ASTCreator.identifier('default')
      const memberExpression = ASTCreator.memberExpression(getExportsExpression(), property)
      const commonJSExpression = ASTCreator.expressionStatement(
        ASTCreator.assignmentExpression('=',
          getExportsExpression(),
          ast.declaration
        )
      )

      const expression = ASTCreator.expressionStatement(
        ASTCreator.assignmentExpression('=',
          memberExpression,
          ast.declaration
        )
      )
      return [
        commonJSExpression,
        expression
      ]
    })

    transformer.add('ExportNamedDeclaration', (ast) => {
      if (ast.declaration) {
        if (ast.declaration.type === 'VariableDeclaration') {
          return handleVariableDeclaration(ast.declaration)
        }

        if (['ClassDeclaration', 'FunctionDeclaration'].includes(ast.declaration.type)) {
          return handleFunctionOrClassExpression(ast.declaration)
        }
      } else {
        return ast.specifiers.map((specifier) => {
          return ASTCreator.expressionStatement(ASTCreator.assignmentExpression('=',
            ASTCreator.memberExpression(getExportsExpression(), specifier.local),
            specifier.exported
          ))
        })
      }

      return ast
    })
  }
}
