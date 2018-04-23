const ASTCreator = require('../utils/ASTCreator')

function getExportsExpression () {
  const object = ASTCreator.identifier('module')
  const property = ASTCreator.identifier('exports')
  return ASTCreator.memberExpression(object, property)
}

module.exports = (transformer) => {
  if (transformer.test((ctx) => ctx.esModules === false)) {
    transformer.add('ExportDefaultDeclaration', (ast) => {
      console.log(ast)
      const property = ASTCreator.identifier('default')
      const memberExpression = ASTCreator.memberExpression(getExportsExpression(), property)
      const expression = ASTCreator.expressionStatement(
        ASTCreator.assignmentExpression('=',
          memberExpression,
          ast.declaration
        )
      )
      return expression
    })

    transformer.add('ExportNamedDeclaration', (ast) => {
      console.log(ast)
      if (ast.declaration) {
        const property = ast.declaration.id
        const memberExpression = ASTCreator.memberExpression(getExportsExpression(), property)

        return ASTCreator.expressionStatement(
          ASTCreator.assignmentExpression('=',
            memberExpression,
            ast.declaration
          )
        )
      } else {
        const properties = ast.specifiers.map((specifier) => {
          return ASTCreator.property('init', specifier.local, specifier.exported)
        })

        const objectExpression = ASTCreator.objectExpression(properties)
        return ASTCreator.expressionStatement(
          ASTCreator.assignmentExpression('=',
            getExportsExpression(),
            objectExpression
          )
        )
      }
    })
  }
}
