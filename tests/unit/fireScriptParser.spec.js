const path = require('path')
const inspect = require('inspect.js')
const FireScriptParser = require('../../src/FireScriptParser')
const TEST_CASE_DIR = path.join(__dirname, '../fixtures/lang')

describe('FireScriptParser', () => {
  describe('parse', () => {
    const testCases = inspect.readDir(TEST_CASE_DIR)
    let group

    testCases.forEach((testCase) => {
      if (testCase.isDirectory()) {
        group = testCase.name

        if (group.charAt(0) === '_') {
          it.skip(`${group.substr(1)} .fire into an AST item`)
          return
        }

        it(`${group} .fire into an AST item`, () => {
          const FireScript = new FireScriptParser()
          const source = inspect
            .readFile(`${testCase.path}/index.fire`)
            .replace(/EOF\s*$/, '')
          const ast = require(`${testCase.path}/ast.json`)

          const res = FireScript.parse(source)

          inspect(res).isEql(ast)
        })
      }
    })
  })
})
