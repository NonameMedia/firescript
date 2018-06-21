function transform (ast) {
  if (!ast.fsParamTypes) return ast
  ast.fsParamTypes.forEach((param, index) => {
    console.log('PARAM TYPE', param)
  })
}

module.exports = (transformer) => {
  transformer.add('FunctionDeclaration', transform)
  transformer.add('FunctionExpression', transform)
}
