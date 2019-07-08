const Node = require('./Node')

/**
 * ClassDeclaration
 *
 * @extends Node
 * @class ClassDeclaration
 *
 * interface ClassDeclaration {
 *   type: 'ClassDeclaration';
 *   id: Identifier | null;
 *   superClass: Identifier | null;
 *   body: ClassBody;
 * }
 */
class ClassDeclaration extends Node {
  constructor (parser) {
    super(parser)

    this.id = null
    this.superClass = null

    if (!parser.match('keyword', 'class')) {
      this.syntaxError('Unexpected token, class keyword expected')
    }

    parser.skipNext()

    if (parser.match('identifier')) {
      this.id = parser.createNode('Identifier')
    }

    if (parser.match('keyword "extends"')) {
      parser.skipNext()
      this.superClass = parser.createNode('Identifier')
    }

    this.body = parser.createNode('ClassBody')
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ClassDeclaration',
      id: this.id ? this.id.resolve(ctx) : null,
      body: this.body ? this.body.resolve(ctx) : null,
      superClass: this.superClass ? this.superClass.resolve(ctx) : null
    })
  }
}

module.exports = ClassDeclaration
