// const elements = {
//   ExpressionStatement: require('../elements/ExpressionStatement'),
//   Identifier: require('../elements/Identifier'),
//   ImportDeclaration: require('../elements/ImportDeclaration'),
//   ImportDefaultSpecifier: require('../elements/ImportDefaultSpecifier'),
//   Literal: require('../elements/Literal'),
//   Program: require('../elements/Program')
// }
//
const elements = require('../FireScriptElements')

class ElementFactory {
  static createElement (ast) {
    const Factory = elements[ast.type]
    if (!Factory) {
      throw new Error(`Element ${ast.type} not implemented yet or it is invalid!`)
    }

    return new Factory(ast)
  }
}

module.exports = ElementFactory
