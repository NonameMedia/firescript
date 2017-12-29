const path = require('path')
const inspect = require('inspect.js')
const SuperFS = require('superfs')
const FireScriptParser = require('../../').FireScriptParser
const FireScriptTranspiler = require('../../').FireScriptTranspiler
const JSParser = require('../../').JSParser
let testFiles = null

const TEST_CASE_DIR = path.join(__dirname, '../fixtures/')
const steps = inspect.readDir(TEST_CASE_DIR)

describe.only('Integrtion test runner', () => {
  steps.forEach((step) => {
    if (!step.isDirectory()) {
      return
    }

    describe(step.name, () => {
      const testCases = inspect.readDir(step.path)
      let group
      testCases.forEach((testCase) => {
        if (testCase.isDirectory()) {
          group = testCase.name
        }

        let jsAST
        let fsAST
        let jsSource
        let fsSource

        it (`Parse AST from JS`, () => {
          const source = inspect.readFile(path.join(testCase.path, 'index.js'))
          const parser = new JSParser()
          jsAST = parser.parseAST(source)
          inspect(jsAST).isObject()
        })

        it (`Transpile AST into FS`, () => {
          const transpiler = new FireScriptTranspiler()
          fsSource = transpiler.transpile(jsAST)
          inspect(fsSource).isString()
        })

        it('Inspect transpiled FS source', () => {
          const expected = inspect.readFile(path.join(testCase.path, 'index.fs'))
          inspect(expected).isEql(fsSource)
        })

        it (`Transpile FS into AST`, () => {
          const parser = new FireScriptParser()
          fsAST = parser.parse(fsSource)
          inspect(fsAST).isObject()
        })

        it('Inspect transpiled FS AST', () => {
          inspect(jsAST).isEql(fsAST)
        })
      })
    })
  })
})
