const inspect = require('inspect.js')
const FireScriptParser = require('../../src/FireScriptParser')

const helloWorldFS =
  'import print from \'print\'\n\n' +
  'print(\'Hello World!\')\n'

const helloWorldAST = require('../fixtures/helloWorldAST.json')

describe('FireScriptParser', () => {
  describe('parse()', () => {
    it('Parse a .fire into AST', () => {
      const FireScript = new FireScriptParser()
      const ast = FireScript.parse(helloWorldFS)
      inspect(ast).isObject()
      inspect(ast).isEql(helloWorldAST)
    })
  })
})
