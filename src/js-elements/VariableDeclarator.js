const JSElement = require('./JSElement')

/**
 * VariableDeclarator
 *
 * @class VariableDeclarator
 * @extends JSElement
 *
 * interface VariableDeclarator {
 *   type: 'VariableDeclarator';
 *   id: Identifier | BindingPattern;
 *   init: Expression | null;
 * }
*/
class VariableDeclarator extends JSElement {
  constructor (ast) {
    super(ast)

    this.id = this.createElement(ast.id)
    this.init = this.createElement(ast.init)
  }

  toString () {
    if (!this.init) {
      return this.id
    }

    return `${this.id.toString()} = ${this.init.toString()}`
  }
}

module.exports = VariableDeclarator
