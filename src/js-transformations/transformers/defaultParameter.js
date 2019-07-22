const ASTCreator = require('../../utils/ASTCreator')

function defaultParamExpression (ast) {
  return ASTCreator.expressionStatement(
    ASTCreator.assignmentExpression('=',
      ast.left,
      ASTCreator.logicalExpression('||',
        ast.left,
        ast.right
      )
    )
  )
}

module.exports = (ast) => {
  ast.params = ast.params.map((param) => {
    if (param.type !== 'AssignmentPattern') {
      return param
    }

    ast.body.body.unshift(defaultParamExpression(param))
    return param.left
  })
  return ast
}
