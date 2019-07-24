const JSElement = require('./JSElement')

/**
 * ReturnStatement
 *
 * @class ReturnStatement
 * @extends JSElement
 *
 * interface ReturnStatement {
    type: 'ReturnStatement';
    argument: Expression | null;
}
*/
class ReturnStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.argument = ast.argument ? this.createElement(ast.argument) : null
  }

  compile (buffer) {
    buffer.registerItem(this.location)
    // buffer.writeComments(this.leadingComments)
    buffer.write('return')
    buffer.write(this.argument ? ' ' : '')
    buffer.write(this.argument)
    buffer.write(';')
    // buffer.writeComments(this.trailingComments)
  }
}

module.exports = ReturnStatement
