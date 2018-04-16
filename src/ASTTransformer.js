class ASTTransformer {
  constructor (ast) {
    this.__transformers = {}
  }

  add (type, fn) {
    this.__transformers[type] = fn
  }

  get (type) {
    return this.__transformers[type] || null
  }

  transform (ast) {
    const keys = Object.keys(ast)
    const transformatedAst = {}

    const transformationFn = this.get(ast.type)
    if (transformationFn) {
      ast = transformationFn(ast)
    }

    for (const key of keys) {
      if (Array.isArray(ast[key])) {
        transformatedAst[key] = ast[key].map((item) => this.transform(item))
      } else if (typeof ast[key] === 'object' && ast[key] !== null) {
        transformatedAst[key] = this.transform(ast[key])
      } else {
        transformatedAst[key] = ast[key]
      }
    }

    return transformatedAst
  }
}

module.exports = ASTTransformer
