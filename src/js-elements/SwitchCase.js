const JSElement = require('./JSElement')

/**
 * SwitchCase
 *
 * @class SwitchCase
 * @extends JSElement
 *
 * interface SwitchCase {
    type: 'SwitchCase';
    test: Expression;
    consequent: Statement[];
}
*/
class SwitchCase extends JSElement {
  constructor (ast) {
    super(ast)

    this.callee = this.createElement(ast.callee)
    this.arguments = this.createElementList(ast.arguments)
    throw new Error(`Element SwitchCase is a DraftElement!`)
  }

  toString () {
    return `${this.callee}(${this.arguments.join(', ')});`
  }
}

module.exports = SwitchCase
