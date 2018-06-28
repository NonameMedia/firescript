const path = require('path')
const inspect = require('inspect.js')
const FirescriptTranspiler = require('../../').FirescriptTranspiler
const TEST_CASE_DIR = path.join(__dirname, '../fixtures/lang')
const featureConf = {}

describe('FirescriptTranspiler', () => {
  describe('transpile', () => {
    const testCases = inspect.readDir(TEST_CASE_DIR)
    let group

    testCases.forEach((testCase) => {
      if (testCase.isDirectory()) {
        group = testCase.name

        if (group.charAt(0) === '_') {
          it.skip(`${group.substr(1)} into Javascript from AST`)
          return
        }

        it(`${group} into Firescript from AST`, () => {
          const ast = require(`${testCase.path}/ast.json`)
          const source = inspect.readFile(`${testCase.path}/result.fire`, { silent: true }) || inspect.readFile(`${testCase.path}/index.fire`)

          const transpiler = new FirescriptTranspiler({
            features: featureConf
          })

          const jsSource = transpiler.transpile(ast)
          inspect(jsSource).isString()
          // console.log(`${jsSource}¬`)
          // console.log(`${source}¬`)
          inspect(jsSource).isEql(source)
        })
      }
    })
  })
})
