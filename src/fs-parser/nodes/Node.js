class Node {
  constructor (parser, token) {
    console.log('TOKEN', token.type, token.value, token.line, token.column)
  }
}

module.exports = Node
