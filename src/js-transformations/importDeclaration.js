const ASTCreator = require('../utils/ASTCreator')

function handleDefaultSpecifier (ast, source) {
  const expression = ASTCreator.callExpression(
    ASTCreator.identifier('require'),
    [source]
  )

  const declarations = [ASTCreator.variableDeclarator(
    ast.local,
    expression
  )]

  return ASTCreator.variableDeclaration('const', declarations)
}

function handleDestructSpecifier (ast, source) {
  const expression = ASTCreator.callExpression(
    ASTCreator.identifier('require'),
    [source]
  )

  const memberExpression = ASTCreator.memberExpression(
    expression,
    ast.imported
  )

  const declarations = [ASTCreator.variableDeclarator(
    ast.local,
    memberExpression
  )]

  return ASTCreator.variableDeclaration('const', declarations)
}

function handleNamespaceSpecifier (ast, source) {
  const expression = ASTCreator.callExpression(
    ASTCreator.identifier('require'),
    [source]
  )

  const declarations = [ASTCreator.variableDeclarator(
    ast.local,
    expression
  )]

  return ASTCreator.variableDeclaration('const', declarations)
}

module.exports = (transformer) => {
  if (transformer.test((ctx) => ctx.esModules === false)) {
    transformer.add('ImportDeclaration', (ast) => {
      const astArray = ast.specifiers.map((specifier) => {
        if (specifier.type === 'ImportDefaultSpecifier') {
          return handleDefaultSpecifier(specifier, ast.source)
        } else if (specifier.type === 'ImportSpecifier') {
          return handleDestructSpecifier(specifier, ast.source)
        } else if (specifier.type === 'ImportNamespaceSpecifier') {
          return handleNamespaceSpecifier(specifier, ast.source)
        } else {
          return specifier
        }
      })

      return astArray
    })
  }
}
