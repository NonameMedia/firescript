const path = require('path')
const inspect = require('inspect.js')
const RenderContext = require('../../src/RenderContext')
const TEST_CASE_DIR = path.join(__dirname, '../fixtures/elements')

describe('JSElements', () => {
  describe('transpile', () => {
    const testCases = inspect.readDir(TEST_CASE_DIR)
    let group

    testCases.forEach((testCase) => {
      if (testCase.isDirectory()) {
        group = testCase.name

        if (group.charAt(0) === '_') {
          it.skip(`${group.substr(1)} into JS from an AST snippet`)
          return
        }

        it(`${group} into JS from an AST snippet`, () => {
          const ast = require(`${testCase.path}/ast.json`)
          const source = inspect
            .readFile(`${testCase.path}/index.js`)
            .replace(/EOF\s*$/, '')

          const ctx = new RenderContext()
          const Element = require(`../../src/js-elements/${ast.type}`)
          const jse = new Element(ast)
          inspect(jse.toESString(ctx)).isEql(source)
        })
      }
    })
  })

  describe.only('renderStack', () => {
    it('has a render stack', () => {
      const ast = require(`${TEST_CASE_DIR}/class-declaration/ast.json`)
      const ctx = new RenderContext()
      const Element = require(`../../src/js-elements/${ast.type}`)
      const jse = new Element(ast)
      const res = jse.toESString(ctx)
      console.log(ctx.renderStack)
    })
  })
})
