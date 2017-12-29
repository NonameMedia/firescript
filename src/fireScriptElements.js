const elements = {
  AssignmentExpression: require('./elements/AssignmentExpression'),
  BinaryExpression: require('./elements/BinaryExpression'),
  BlockStatement: require('./elements/BlockStatement'),
  CallExpression: require('./elements/CallExpression'),
  ExpressionStatement: require('./elements/ExpressionStatement'),
  FunctionDeclaration: require('./elements/FunctionDeclaration'),
  Identifier: require('./elements/Identifier'),
  ImportDeclaration: require('./elements/ImportDeclaration'),
  ImportDefaultSpecifier: require('./elements/ImportDefaultSpecifier'),
  Literal: require('./elements/Literal'),
  Program: require('./elements/Program'),
  ReturnStatement: require('./elements/ReturnStatement'),
  VariableDeclaration: require('./elements/VariableDeclaration'),
  VariableDeclarator: require('./elements/VariableDeclarator')
}

module.exports = elements
