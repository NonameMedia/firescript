const path = require('path')
const superimport = require('superimport')
const ASTCreator = require('./utils/ASTCreator')

class ASTTransformer {
  constructor (ctx) {
    this.__transformers = {}
    this.ctx = ctx
  }

  add (type, fn) {
    if (!this.__transformers[type]) {
      this.__transformers[type] = []
    }

    this.__transformers[type].push(fn)
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

  transform (ast) {
    const transformatedAst = this.transformItem(ast)
    if (this.importRuntime) {
      this.importModule([[ '__FS' ]], 'firescript-runtime', transformatedAst)
    }

    return transformatedAst
  }

  transformItem (ast, index, parent) {
    const transformatedAst = {}
    if (ast.FS_skipTransform) {
      return ast.FS_skipTransform
    }

    const transformationFn = (funcs, ast) => {
      let trans = ast
      funcs.forEach((fn) => {
        trans = Array.isArray(trans)
          ? trans.map(fn)
          : fn(trans)
      })

      return trans
    }
    const funcs = this.get(ast.type)
    if (funcs) {
      const transformed = transformationFn(funcs, ast)
      if (Array.isArray(transformed)) {
        return transformed
      } else if (transformed !== ast) {
        ast = transformed
      }
    }

    const keys = Object.keys(ast)
    for (const key of keys) {
      if (Array.isArray(ast[key])) {
        const childs = []
        ast[key].forEach((item, index, parent) => {
          const transformed = this.transformItem(item, index, parent)
          if (Array.isArray(transformed)) {
            transformed.forEach((child) => childs.push(this.transformItem(child)))
          } else {
            childs.push(transformed)
          }
        })
        transformatedAst[key] = childs
      } else if (typeof ast[key] === 'object' && ast[key] !== null) {
        transformatedAst[key] = this.transformItem(ast[key])
      } else {
        transformatedAst[key] = ast[key]
      }
    }

    return transformatedAst
  }

  importModule (specifiers, moduleName, ast) {
    const importDeclaration = ASTCreator.importDeclaration(specifiers, moduleName)

    const runtimeImport = this.transformItem(importDeclaration)
    ast.body.unshift(Array.isArray(runtimeImport) ? runtimeImport[0] : runtimeImport)
  }
}

module.exports = ASTTransformer
