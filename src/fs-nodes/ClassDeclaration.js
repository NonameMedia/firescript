const FireScriptNode = require('./FireScriptNode')

/**
 * ClassDeclaration
 *
 * @extends FireScriptNode
 * @class ClassDeclaration
 *
 * interface ClassDeclaration {
 *   type: 'ClassDeclaration';
 *   id: Identifier | null;
 *   superClass: Identifier | null;
 *   body: ClassBody;
 * }
 */
class ClassDeclaration extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    this.id = null
    this.superClass = null

    if (!tokenStack.expect('keyword', 'class')) {
      this.syntaxError('Unexpected token, class keyword expected', tokenStack.current())
    }

    tokenStack.goForward()

    if (tokenStack.expect('identifier')) {
      this.id = this.createIdentifierNode(tokenStack)
    }

    if (tokenStack.expect('keyword', 'extends')) {
      tokenStack.goForward()
      this.superClass = this.createIdentifierNode(tokenStack)
    }

    this.body = this.createClassBodyNode(tokenStack)
  }

  toJSON () {
    return {
      type: 'ClassDeclaration',
      id: this.id ? this.id.toJSON() : null,
      body: this.body.toJSON(),
      superClass: this.superClass ? this.superClass.toJSON() : null
    }
  }
}

module.exports = ClassDeclaration
