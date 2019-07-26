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

    this.object = object || parser.nextRealNode(this)

    const memberExpressionStack = []
    this.computed = false

    if (this.object && property) {
      this.property = property

      if (property.type === 'Literal') {
        this.computed = true
      }
      return
    }

    if (this.object) {
      memberExpressionStack.push([this.object, false])
    }

    while (true) {
      if (parser.isInnerScope(this.indention) || parser.isSameScope(this.indention)) {
        if (parser.match('indention > punctuator [.,\\[]')) {
          parser.skipNext()
        } else {
          break
        }
      }

      if (parser.match('punctuator "."')) {
        parser.skipNext()
        memberExpressionStack.push([parser.nextRealNode(this), false])
      } else if (parser.match('punctuator "["')) {
        parser.skipNext()
        const node = parser.nextNode(this)
        if (parser.match('punctuator "["')) {
          memberExpressionStack.push([parser.createNode('MemberExpression', node), true])
        } else {
          memberExpressionStack.push([node, true])
        }
        if (!parser.match('punctuator "]"')) {
          this.syntaxError('Unexpected token, `]` char expected')
        }

        parser.skipNext()
      } else {
        break
      }
    }

    // console.log('STACK', memberExpressionStack)
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
