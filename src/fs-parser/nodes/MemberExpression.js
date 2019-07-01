const Node = require('./Node')

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

class MemberExpression extends Node {
  constructor (parser, object, property) {
    super(parser, object)

    // console.log('MEMEXP', object, property)

    const memberExpressionStack = []
    this.computed = false

    if (object && property) {
      this.object = object
      this.property = property

      if (property.type === 'Literal') {
        this.computed = true
      }
      return
    }

    if (object) {
      memberExpressionStack.push(object)
    }

    while (true) {
      if (parser.match('punctuator "."')) {
        parser.skipNext()
        memberExpressionStack.push(parser.nextRealNode())
      } else if (parser.match('punctuator "["')) {
        parser.skipNext()
        memberExpressionStack.push(parser.nextRealNode())
        if (!parser.match('punctuator "]"')) {
          this.syntaxError('Unexpected token, `]` char expected')
        }
      } else {
        break
      }
    }

    if (memberExpressionStack.length === 2) {
      this.object = memberExpressionStack.shift()
      this.property = memberExpressionStack.shift()
      this.computed = this.property.type === 'Literal'
      return
    }

    this.property = memberExpressionStack.pop()

    let obj
    let child
    while (memberExpressionStack.length > 0) {
      obj = obj || memberExpressionStack.shift()
      const prop = memberExpressionStack.shift()
      child = new MemberExpression(parser, obj, prop)
      obj = child
    }

    this.object = obj
    this.isAllowedNode(this.object, ALLOWED_CHILDS)
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'MemberExpression',
      computed: this.computed,
      object: this.object.resolve(ctx),
      property: this.property.resolve(ctx)
    })
  }
}

module.exports = MemberExpression
