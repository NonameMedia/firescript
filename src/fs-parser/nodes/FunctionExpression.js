const FunctionDeclaration = require('./FunctionDeclaration')

class FunctionExpression extends FunctionDeclaration {
  resolve (ctx) {
    return this.createJSON(ctx, {
      type: 'FunctionExpression',
      id: this.id ? this.id.resolve(ctx) : this.id,
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
