const Program = require('./fireScriptElements').Program

class FireScriptTranspiler {
  constructor () {
    this.buffer = []
  }

  transpile (ast) {
    this.next(ast)
    return this.buffer.join('')
  }

  transpile2 (ast) {
    const fireScript = new Program(ast)
    return fireScript.toString()
  }

  next (ast) {
    if (ast.type === 'Program') {
      return this.transpileProgram(ast.body)
    }

    if (ast.type === 'ImportDeclaration') {
      return this.transpileImportDeclaration(ast.specifiers, ast.source)
    }

    if (ast.type === 'ExpressionStatement') {
      return this.next(ast.expression)
    }

    if (ast.type === 'CallExpression') {
      return this.transpileCallExpression(ast.callee, ast.arguments)
    }

    if (ast.type === 'Literal') {
      return this.transpileLiteral(ast.value, ast.raw)
    }

    throw new TypeError(`Transpilation failed! ${ast.type} is not supported yet!`)
  }

  transpileProgram (body) {
    body.forEach(item => this.next(item))
  }

  transpileImportDeclaration (specifiers, source) {
    const specifiersArr = specifiers.map((item) => {
      if (item.type === 'ImportDefaultSpecifier') {
        return item.local.name
      }
    })

    this.buffer.push(`import ${specifiersArr.join(', ')} from '${source.value}'\n`)
  }

  transpileCallExpression (callee, args) {
    this.buffer.push(`${callee.name}(`)
    args.forEach((item, index) => {
      if (index !== 0) {
        this.buffer.push(', ')
      }

      this.next(item)
    })

    this.buffer.push(`)`)
  }

  transpileLiteral (value, raw) {
    this.buffer.push(`'${value}'`)
  }
}

module.exports = FireScriptTranspiler
