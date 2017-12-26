const inspect = require('inspect.js')
const JSParser = require('../../src/JSParser')

const helloWorldJS =
  'import print from "print"\n' +
  'print("Hello World!")\n'

const helloWorldAST = {

}

describe('JSParser', () => {
  describe('parseAST()', () => {
    it('Parse a .js into AST', () => {
      const FireScript = new JSParser()
      const ast = FireScript.parseAST(helloWorldJS)
      inspect(ast).isObject()
      inspect(ast).isEql(helloWorldAST)
    })
  })
})
