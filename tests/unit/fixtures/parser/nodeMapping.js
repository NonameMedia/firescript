module.exports = {
  mapping: {
    'Identifier > punctuator "."': {
      name: 'MemberExpression'
    },
    'FunctionExpression > punctuator "."': {
      name: 'MemberExpression'
    }
  }
}
