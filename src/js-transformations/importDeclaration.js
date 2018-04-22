const ASTCreator = require('../utils/ASTCreator')

module.exports = (transformer) => {
  if (transformer.test((ctx) => ctx.esModules === false)) {
    transformer.add('ImportDeclaration', (ast) => {
      const source = ast.source
      const expression = ASTCreator.callExpression(
        ASTCreator.identifier('require'),
        [source]
      )

      const declarations = ast.specifiers.map((item) => ASTCreator.variableDeclarator(
        ast.specifiers[0].local,
        expression
      ))

      return ASTCreator.variableDeclaration('const', declarations)
    })
  }
}
