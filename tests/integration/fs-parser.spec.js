const path = require('path')
const inspect = require('inspect.js')
const FireScriptParser = require('../../').FireScriptParser

const TEST_CASE_DIR = path.join(__dirname, '../fixtures/lang')

describe('FireScript parser', () => {
  describe('lang', () => {
    const testCases = inspect.readDir(TEST_CASE_DIR)
    let group

    testCases.forEach((testCase) => {
      if (testCase.isDirectory()) {
        group = testCase.name
      }

      describe(`test ${group}`, () => {
        it(`parse FS into AST`, () => {
          const ast = require(`${testCase.path}/ast.json`)
          const source = inspect.readFile(`${testCase.path}/index.fire`)
          const parser = new FireScriptParser()
          const fsAST = parser.parse(source)
          inspect(fsAST).isObject()
          inspect(fsAST).isEql(ast)
        })
      })
    })
  })
})
