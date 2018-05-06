const inspect = require('inspect.js')

const helloWorldFS =
  'import ** as print from \'print\'\n\n' +
  'print(\'Hello World!\')\n'

const FireScriptTranspiler = require('../../src/FireScriptTranspiler')
const helloWorldAST = require('../fixtures/helloWorldAST.json')

describe('FireScriptTranspiler', () => {
  describe('transpile()', () => {
    it('transpiles a AST to .fs, using elements', () => {
      const fireScript = new FireScriptTranspiler()
      const source = fireScript.transpile(helloWorldAST)
      inspect(source).isEql(helloWorldFS)
    })
  })
})
