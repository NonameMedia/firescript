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

    console.log('MEMEXP', object, property)

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
      memberExpressionStack.push([object, false])
    }

    while (true) {
      if (parser.isInnerScope(this.indention) || parser.isSameScope(this.indention)) {
        console.log('SKIP INDENTION')
        parser.skipNext()
      }

      if (parser.match('punctuator "."')) {
        parser.skipNext()
        memberExpressionStack.push([parser.nextRealNode(), false])
      } else if (parser.match('punctuator "["')) {
        parser.skipNext()
        memberExpressionStack.push([parser.nextRealNode(), true])
        if (!parser.match('punctuator "]"')) {
          this.syntaxError('Unexpected token, `]` char expected')
        }

        parser.skipNext()
      } else {
        break
      }
    }

    console.log('STACK', memberExpressionStack)
    if (memberExpressionStack.length === 2) {
      const obj = memberExpressionStack.shift()
      this.object = obj[0]

      const prop = memberExpressionStack.shift()
      this.property = prop[0]
      this.computed = prop[1]
    } else {
      const prop = memberExpressionStack.pop()
      this.property = prop[0]
      this.computed = prop[1]

      let obj
      let child
      while (memberExpressionStack.length > 0) {
        if (!obj) {
          const item = memberExpressionStack.shift()
          obj = item[0]
        }

        const prop = memberExpressionStack.shift()
        child = new MemberExpression(parser, obj, prop[0])
        child.computed = prop[1]
        obj = child
      }

      this.object = obj
      this.isAllowedNode(this.object, ALLOWED_CHILDS)
    }
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
