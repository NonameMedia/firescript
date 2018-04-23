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
        return transformed
      } else {
        ast = transformed
      }
    }

    const keys = Object.keys(ast)
    for (const key of keys) {
      if (Array.isArray(ast[key])) {
        const childs = []
        ast[key].forEach((item, index, parent) => {
          const transformed = this.transform(item, index, parent)
          if (Array.isArray(transformed)) {
            transformed.forEach((child) => childs.push(this.transform(child)))
          } else {
            childs.push(transformed)
          }
        })
        transformatedAst[key] = childs
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
