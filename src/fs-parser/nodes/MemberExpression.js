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
    super(parser)

    console.log('MEMEXP', object, property)

    // if (object) {
    //   this.object = object
    // } else {
    //   const memberExpressionStack = []
    //   while (parser.match('identifier > punctuator "."')) {
    //     memberExpressionStack.push(parser.nextToken())
    //   }
    //
    //   console.log('MEMSTACK', memberExpressionStack)
    //   while (memberExpressionStack.length > 0) {
    //     const property = memberExpressionStack.pop()
    //   }
    // }

    this.computed = false
    this.isAllowedNode(this.object, ALLOWED_CHILDS)

    // if (tokenStack.expect('indention')) {
    //   tokenStack.goForward()
    // }

    // if (!tokenStack.expect('punctuator', ['.', '['])) {
    //   this.syntaxError('Unexpected token', tokenStack.current())
    // }

    if (parser.match('punctuator "."')) {
      parser.skipNext()
      this.property = parser.nextNode()
    } else if (parser.match('punctuator "["')) {
      this.computed = true
      parser.skipNext()
      this.property = parser.nextNode()
      if (!parser.match('punctuator "]"')) {
        this.syntaxError('Unexpected token, `]` char expected')
      }

      parser.skipNext()
    } else {
      this.syntaxError('Unexpected token')
    }

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
