const typingNode = require('./nodes/typing')

module.exports = (transformer) => {
  transformer.add('VariableDeclarator', (ast) => {
    if (ast.fsTyping && ast.fsTyping.name !== 'any') {
      transformer.importRuntime = true
      ast.init = typingNode(ast.fsTyping, ast.init)
    }

    return ast
  })
}
