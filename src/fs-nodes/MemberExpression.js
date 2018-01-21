const FireScriptNode = require('./FireScriptNode')

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

class MemberExpression extends FireScriptNode {
  constructor (tokenStack, parent, object) {
    super(parent)

    this.object = object || this.createNode(tokenStack)
    console.log('CHECK MEM CHILD', this.object.type, this.type)
    this.isAllowedToken(this.object, ALLOWED_CHILDS, tokenStack.current())

    tokenStack.print()
    if (!tokenStack.expect('punctuator', '.')) {
      this.syntaxError('Unexpected token', tokenStack.current())
    }

    tokenStack.goForward()

    this.property = this.createNode(tokenStack)
    this.isAllowedToken(this.object, ALLOWED_CHILDS, tokenStack.current())
  }

  toJSON () {
    return {
      type: 'MemberExpression',
      computed: false,
      object: this.object.toJSON(),
      property: this.property.toJSON()
    }
  }
}

module.exports = MemberExpression
