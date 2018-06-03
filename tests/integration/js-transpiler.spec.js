const path = require('path')
const inspect = require('inspect.js')
const JSTranspiler = require('../../').JSTranspiler
const TEST_CASE_DIR = path.join(__dirname, '../fixtures/lang')

describe('JSTranspiler', () => {
  const featureConf = {
    esModules: true,
    esClasses: true
  }

  describe('transpile', () => {
    const testCases = inspect.readDir(TEST_CASE_DIR)
    let group

    testCases.forEach((testCase) => {
      if (testCase.isDirectory()) {
        group = testCase.name

        if (group.charAt(0) === '_') {
          it.skip(`${group} into Javascript from AST`)
          return
        }

        it(`${group} into Javascript from AST`, () => {
          const ast = require(`${testCase.path}/ast.json`)
          const source = inspect.readFile(`${testCase.path}/result.js`, { silent: true }) || inspect.readFile(`${testCase.path}/index.js`)

          const transpiler = new JSTranspiler({
            features: featureConf
          })

          const jsSource = transpiler.transpile(ast)
          inspect(jsSource).isString()
          inspect(jsSource).isEql(source)
        })
      }
    })
  })

  describe('transform', () => {
    const testCases = inspect.readDir(TEST_CASE_DIR)
    let group

    testCases.forEach((testCase) => {
      if (testCase.isDirectory()) {
        group = testCase.name
        const jst = inspect.readFile(`${testCase.path}/jst.js`, { silent: true })

        if (!jst) return

        it(`${group} into Javascript from AST`, () => {
          const ast = require(`${testCase.path}/ast.json`)
          const jstConf = inspect.readJSON(`${testCase.path}/jstConf.json`, { silent: true })

          const transpiler = new JSTranspiler({
            features: Object.assign({}, featureConf, jstConf)
          })

          const jsSource = transpiler.transpile(ast)
          inspect(jsSource).isString()
          inspect(jsSource).isEql(jst)
        })
      }
    })
  })
})
