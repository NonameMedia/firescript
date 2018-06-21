const ASTCreator = require('../utils/ASTCreator')

function getFSType (type) {
  return ASTCreator.memberExpression(
    ASTCreator.identifier('__FS'),
    ASTCreator.identifier('TYPE_STR')
  )
}

function createTypeBindingNode (ast) {
  const object = ASTCreator.identifier('__FS')
  const property = ASTCreator.identifier('bindType')
  return ASTCreator.callExpression(
    ASTCreator.memberExpression(object, property),
    [ getFSType(ast.fsType.name), ast.init ]
  )
}

module.exports = (transformer) => {
  transformer.add('VariableDeclarator', (ast) => {
    if (ast.fsType) {
      transformer.importRuntime = true
      ast.init = createTypeBindingNode(ast)
    }

    return ast
  })
}
