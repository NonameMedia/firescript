const Node = require('./Node')

const ALLOWED_PARAMS = [
  'Identifier',
  'AssignmentPattern',
  'ArrayPattern',
  'ObjectPattern',
  'RestElement'
]

class FunctionExpression extends Node {
  constructor (parser) {
    super(parser)

    this.id = null
    this.async = false
    this.expression = false
    this.generator = false

    if (!parser.match('punctuator "("')) {
      const fnType = parser.getKeyword()
      if (fnType.value === 'async') {
        this.async = true
      } else if (fnType.value === 'gen') {
        this.generator = true
      } else if (!fnType.value === 'func') {
        parser.syntaxError('Unexpected token, async, gen or func keyword expected!')
      }
    }

    if (this.async || parser.match('identifier')) {
      this.id = parser.createNode('Identifier')
    }

    this.params = []
    this.fsParamTypings = []

    if (!parser.match('punctuator "("')) {
      parser.syntaxError('Function arguments expected')
    }

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

    this.body = parser.createNode('BlockStatement')
  }

  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'FunctionExpression',
      id: this.id ? this.id.resolve(ctx) : null,
      params: this.params.map((item) => item.resolve(ctx)),
      fsParamTypings: this.fsParamTypings.map((item) => item.resolve(ctx)),
      body: this.body.resolve(ctx),
      async: this.async,
      expression: this.expression,
      generator: this.generator
    })
  }
}

module.exports = FunctionExpression
