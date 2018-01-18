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

    if (!object) {
      this.syntaxError('Parent node not set')
    }

    this.object = object
    this.isAllowedToken(this.object, ALLOWED_CHILDS)

    tokenStack.print()
    if (!tokenStack.expect('punctuator', '.')) {
      this.syntaxError('Unexpected token', tokenStack.current())
    }

    tokenStack.goForward()

    this.property = this.createNode(tokenStack)
    this.isAllowedToken(this.object, ALLOWED_CHILDS)
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
