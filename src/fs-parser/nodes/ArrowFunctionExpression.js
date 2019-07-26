const Node = require('./Node')

const ALLOWED_PARAMS = [
  'Identifier',
  'AssignmentPattern',
  'ArrayPattern',
  'ObjectPattern',
  'RestElement'
]

class ArrowFunctionExpression extends Node {
  constructor (parser, args) {
    super(parser)

    this.async = false
    this.expression = false
    this.generator = false

    if (parser.match('keyword "async"')) {
      parser.skipNext()
      this.async = true
    }

    this.params = []
    this.fsParamTypings = []

    if (args && args.type === 'FirescriptGrouping') {
      this.params = Array.from(args.elements)
    } else if (parser.match('punctuator "("')) {
      for (const scope of parser.walkScope()) {
        if (scope.match('identifier > identifier')) {
          this.fsParamTypings.push(scope.createNode('FirescriptTyping'))
        } else {
          this.fsParamTypings.push(scope.createNode('FirescriptTyping', 'any'))
        }

        const param = scope.nextNode(this)
        this.isAllowedNode(param, ALLOWED_PARAMS)
        this.params.push(param)
      }
    } else {
      const param = parser.nextNode(this)
      this.params.push(param)
    }

    if (!parser.match('operator "=>"')) {
      parser.syntaxError('Arrow expression expected')
    }

    parser.skipNext()
    this.body = parser.createNode('BlockStatement')
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'ArrowFunctionExpression',
      id: null,
      params: this.params.map((item) => item.resolve(ctx)),
      fsParamTypings: this.fsParamTypings.map((item) => item.resolve(ctx)),
      body: this.body.resolve(ctx),
      async: this.async,
      expression: this.expression,
      generator: this.generator
    })
  }
}

module.exports = ArrowFunctionExpression
