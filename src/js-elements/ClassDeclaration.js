const JSElement = require('./JSElement')

/**
 * ClassDeclaration
 *
 * @class ClassDeclaration
 * @extends JSElement
 *
 * interface ClassDeclaration {
 *   type: 'ClassDeclaration';
 *   id: Identifier | null;
 *   superClass: Identifier | null;
 *   body: ClassBody;
 * }
 */
class ClassDeclaration extends JSElement {
  constructor (ast) {
    super(ast)

    this.id = ast.id ? this.createElement(ast.id) : null
    this.superClass = ast.superClass ? this.createElement(ast.superClass) : null
    this.body = ast.body ? this.createElement(ast.body) : null
  }

  compile (buffer) {
    buffer.registerItem(this.location, 'class')
    buffer.write('class ')
    this.id.compile(buffer)

    if (this.superClass) {
      buffer.write(' extends ')
      this.superClass.compile(buffer)
    }

    buffer.write(' ')

    this.body.compile(buffer)
  }
}

module.exports = ClassDeclaration
