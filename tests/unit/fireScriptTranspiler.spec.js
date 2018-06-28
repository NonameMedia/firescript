const inspect = require('inspect.js')

const helloWorldFS =
  'import ** as print from \'print\'\n\n' +
  'print(\'Hello World!\')\n'

const FirescriptTranspiler = require('../../src/FirescriptTranspiler')
const helloWorldAST = require('../fixtures/helloWorldAST.json')

describe('FirescriptTranspiler', () => {
  describe('transpile()', () => {
    it('transpiles a AST to .fs, using elements', () => {
      const fireScript = new FirescriptTranspiler()
      const source = fireScript.transpile(helloWorldAST)
      inspect(source).isEql(helloWorldFS)
    })
  })
})
