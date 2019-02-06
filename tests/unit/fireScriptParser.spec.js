const path = require('path')
const inspect = require('inspect.js')
const FirescriptParser = require('../../src/FirescriptParser')

describe('FirescriptParser', () => {
  describe('instance', () => {
    it('set indention size to 2 as fallback', () => {
      const parser = new FirescriptParser()
      inspect(parser.indentionSize).isEql(2)
    })

    it('set indention size to config value', () => {
      const parser = new FirescriptParser({
        indention: 4
      })

      inspect(parser.indentionSize).isEql(4)
    })
  })

  describe('parse', () => {
    const TEST_CASE_DIR = path.join(__dirname, '../fixtures/lang')
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
          const Firescript = new FirescriptParser()
          const source = inspect
            .readFile(`${testCase.path}/index.fire`)
            .replace(/EOF\s*$/, '')
          const ast = require(`${testCase.path}/ast.json`)

          const res = Firescript.parse(source)

          inspect(res).isEql(ast)
        })
      }
    })
  })

  describe.only('parse with setLocation enabled', () => {
    const TEST_CASE_DIR = path.join(__dirname, '../fixtures/lang-with-loc')
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
          const Firescript = new FirescriptParser({
            loc: true
          })

          const source = inspect
            .readFile(`${testCase.path}/index.fire`)
            .replace(/EOF\s*$/, '')
          const ast = require(`${testCase.path}/ast.json`)

          const res = Firescript.parse(source)

          inspect(res).isEql(ast)
        })
      }
    })
  })
})
