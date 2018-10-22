const ASTCreator = require('../utils/ASTCreator')

module.exports = (transformer) => {
  if (transformer.test((ctx) => ctx.extendRegExp === true)) {
    transformer.add('Literal', (ast) => {
      if (ast.regex) {
        transformer.importRuntime = true
        return ASTCreator.callExpression(
          ASTCreator.memberExpression(
            ASTCreator.identifier('FireIO'),
            ASTCreator.identifier('reg')
          ),
          [
            {
              FS_skipTransform: ast
            }
          ]
        )
      }

      return ast
    })
  }
}