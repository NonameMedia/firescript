const FirescriptNode = require('./FirescriptNode')

const ALLOWED_CHILDS = [
  'ThisExpression',
  'Identifier',
  'Literal',
  'ArrayExpression',
  'ObjectExpression',
  'FunctionExpression',
  'ArrowFunctionExpression',
  'ClassExpression',
  'TaggedTemplateExpression',
  'MemberExpression',
  'Super',
  'MetaProperty',
  'NewExpression',
  'CallExpression',
  'UpdateExpression',
  'AwaitExpression',
  'UnaryExpression',
  'BinaryExpression',
  'LogicalExpression',
  'ConditionalExpression',
  'YieldExpression',
  'AssignmentExpression',
  'SequenceExpression'
]

class MemberExpression extends FirescriptNode {
  constructor (tokenStack, parent, object) {
    super(tokenStack, parent)

    this.object = object || this.createNodeItem(tokenStack)
    this.computed = false
    this.isAllowedNode(this.object, ALLOWED_CHILDS, tokenStack.current())

    if (!tokenStack.expect('punctuator', ['.', '['])) {
      this.syntaxError('Unexpected token', tokenStack.current())
    }

    if (tokenStack.expect('punctuator', '[')) {
      this.computed = true
      tokenStack.goForward()
      this.property = this.createFullNode(tokenStack)

      if (tokenStack.expect('punctuator', ']')) {
        tokenStack.goForward()
      }
    } else {
      tokenStack.goForward()
      if (tokenStack.expect(['numeric', 'literal'])) {
        this.property = this.createLiteralNode(tokenStack)
      } else {
        this.property = this.createIdentifierNode(tokenStack)
      }
    }

    this.isAllowedNode(this.object, ALLOWED_CHILDS, tokenStack.current())
  }

  toJSON () {
    return this.createJSON({
      type: 'MemberExpression',
      computed: this.computed,
      object: this.object.toJSON(),
      property: this.property.toJSON()
    })
  }
}

module.exports = MemberExpression
