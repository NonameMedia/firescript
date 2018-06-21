const ASTCreator = require('../utils/ASTCreator')
const typingNode = require('./nodes/typing')

module.exports = (transformer) => {
  function transform (ast) {
    if (!ast.fsParamTypings || ast.fsParamTypings.length === 0) return ast

    const typings = []
    ast.fsParamTypings.forEach((typing, index) => {
      if (typing.name === 'any') return
      typings.push(ASTCreator.expressionStatement(typingNode(typing, ast.params[index])))
    })

    if (typings.length) {
      transformer.importRuntime = true
      ast.body.body.unshift.apply(ast.body.body, typings)
    }

    return ast
  }

  transformer.add('FunctionDeclaration', transform)
  transformer.add('FunctionExpression', transform)
}
