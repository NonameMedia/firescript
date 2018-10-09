const ASTCreator = require('../utils/ASTCreator')

module.exports = (transformer) => {
  if (transformer.test((ctx) => ctx.extendRegExp === true)) {
    transformer.add('Literal', (ast) => {
      if (ast.regex) {
        return ASTCreator.callExpression(
          ASTCreator.memberExpression(
            ASTCreator.identifier('__FS'),
            ASTCreator.identifier('reg')
          ),
          [
            ast.raw
          ]
        )
      }
    })
  }
}
