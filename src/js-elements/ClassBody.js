const JSElement = require('./JSElement')

/**
 * ClassBody
 *
 * @class ClassBody
 * @extends JSElement
 *
 * interface ClassBody {
    type: 'ClassBody';
    body: MethodDefinition[];
}
*/
class ClassBody extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element ClassBody is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = ClassBody
