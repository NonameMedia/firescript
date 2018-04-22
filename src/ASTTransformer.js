const path = require('path')
const superimport = require('superimport')

class ASTTransformer {
  constructor (ctx) {
    this.__transformers = {}
    this.ctx = ctx
  }

  add (type, fn) {
    this.__transformers[type] = fn
  }

  get (type) {
    return this.__transformers[type] || null
  }

  load (dirName) {
    const transformations = superimport.importAll(path.join(__dirname, `./${dirName}`))
    transformations.forEach((t) => t(this))
  }

  test (fn) {
    return fn(this.ctx)
  }

  transform (ast, index, parent) {
    const transformatedAst = {}

    const transformationFn = this.get(ast.type)
    if (transformationFn) {
      const transformed = transformationFn(ast)
      if (Array.isArray(transformed)) {
        parent.splice.apply(parent, [index, 1].concat(transformed))
        ast = parent[index]
      } else {
        ast = transformed
      }
    }

    const keys = Object.keys(ast)
    for (const key of keys) {
      if (Array.isArray(ast[key])) {
        transformatedAst[key] = ast[key].map((item, index, parent) => this.transform(item, index, parent))
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
